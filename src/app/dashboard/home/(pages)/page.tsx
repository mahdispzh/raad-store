"use client";

import { BarChart } from "@/src/shared/components/bar-chart/bar-chart.ui";

import { CustomTable } from "@/src/shared/components/custom-table/custom-table.ui";

import { LineChart } from "@/src/shared/components/line-chart/line-chart.ui";
import { ListCard } from "@/src/shared/components/list-card/list-card.ui";
import { PieChartCard } from "@/src/shared/components/pie-chart/pie-chart.ui";
import { RadialChart } from "@/src/shared/components/radical-chart/radial-chart.ui";
import { RankingCard } from "@/src/shared/components/ranking-card/ranking-card.ui";
import { StatCard } from "@/src/shared/components/stat-card/stat-card.ui";
import {
  AnalyticsIcon,
  BoxIcon,
  CategoryIcon,
  FactorIcon,
  FileIcon,
  ReportIcon,
  TimelineIcon,
} from "@/src/shared/constants/icons";
import { AddButton, OrderStatusBadge, Text } from "@/src/shared/ui";
import { getPercentChange } from "@/src/shared/utils/percent-change";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminOverview } from "../_hooks/useAdminOverview";
import { useCategoriesOverview } from "../_hooks/useCategoriesOverview";
import { useOrdersOverview } from "../_hooks/useOrdersOverview";
import { usePaymentsOverview } from "../_hooks/usePaymentsOverview";
import { useUsersOverview } from "../_hooks/useUsersOverview";
import { useVariantsOverview } from "../_hooks/useVariantsOverview";
import { getMonthlyRevenue, MonthlyRevenueResponse } from "../_services/admin-overview.api";
import { TableColumn } from "@/src/shared/components/custom-table/table.types";
import { mapLatestOrdersToTableRows, OrderTableRow } from "@/src/shared/components/custom-table/map-order-to-table";
import {
  getCurrentJalaliYear,
  getJalaliMonthNumber,
  PERSIAN_MONTHS,
} from "@/src/shared/utils/analytics";
import { toJalaali } from "jalaali-js";

const ORDER_COLUMNS: TableColumn<OrderTableRow>[] = [
  {
    key: "index",
    header: "ردیف",
    align: "center",
    render: (_row, index) => (
      <Text
        text={String(index + 1).padStart(2, "0")}
        size="sm"
        color="secondary"
        align="center"
      />
    ),
  },
  {
    key: "orderNumber",
    header: "شماره سفارش",
    align: "center",
    render: (row) => (
      <Text
        text={row.orderNumber}
        size="sm"
        color="secondary"
        weight="medium"
        align="center"
      />
    ),
  },
  {
    key: "date",
    header: "تاریخ",
    align: "center",
    render: (row) => (
      <Text text={row.date} size="sm" color="secondary" align="center" />
    ),
  },
  {
    key: "amount",
    header: "مبلغ (تومان)",
    align: "center",
    render: (row) => (
      <Text
        text={row.amount}
        size="sm"
        color="secondary"
        weight="medium"
        align="center"
      />
    ),
  },
  {
    key: "status",
    header: "وضعیت",
    align: "center",
    render: (row) => <OrderStatusBadge status={row.status} />,
  },
];

export default function DashboardHome() {
  const router = useRouter();

  // ===== هوک‌های دیتا =====
  const { data: variantsOverview } = useVariantsOverview();
  const { data: ordersOverview } = useOrdersOverview();
  const { data: usersOverview } = useUsersOverview();
  const { data: paymentsOverview } = usePaymentsOverview();
  const { data: categoriesOverview } = useCategoriesOverview();

  // ===== ماه جاری شمسی =====
const currentMonthName = PERSIAN_MONTHS[toJalaali(new Date()).jm - 1] ?? "فروردین";
  const [selectedMonthName, setSelectedMonthName] = useState<string>(currentMonthName);
  const currentYear = getCurrentJalaliYear();
  const selectedMonthNumber = getJalaliMonthNumber(selectedMonthName) ?? 1;

  // ===== هوک adminOverview برای پرفروش‌ترین محصولات =====
  const { data: adminOverview } = useAdminOverview(currentYear, selectedMonthNumber);

  // ===== درآمد ماهانه (LineChart) =====
  const { data: monthlyRevenue } = useQuery<MonthlyRevenueResponse>({
    queryKey: ["monthlyRevenue", currentYear, selectedMonthNumber],
    queryFn: () => getMonthlyRevenue(currentYear, selectedMonthNumber),
    staleTime: 5 * 60 * 1000,
  });

  // ===== داده‌های LineChart =====
  const monthlySalesPoints =
    monthlyRevenue?.revenueByDay.map((item) => ({
      day: item.day,
      value: item.revenue,
    })) ?? [];

  // ===== موجودی انبار (ListCard) =====
  const inventoryItems =
    variantsOverview?.report?.lowestStockVariants
      ?.slice(0, 3)
      .map((variant: any) => ({
        id: variant.id,
        name: variant.products?.name ?? "",
        count: variant.stock,
        image: variant.products?.images?.[0] ?? "",
      })) ?? [];

  // ===== آمارها =====
  const todayRevenue = ordersOverview?.summary.todayRevenue ?? 0;
  const yesterdayRevenue = ordersOverview?.summary.yesterdayRevenue ?? 0;
  const salesPercent = getPercentChange(todayRevenue, yesterdayRevenue);

  const todayOrders = ordersOverview?.summary.todayOrders ?? 0;
  const yesterdayOrders = ordersOverview?.summary.yesterdayOrders ?? 0;
  const ordersPercent = getPercentChange(todayOrders, yesterdayOrders);

  const thisMonthUsers = usersOverview?.summary.thisMonthUsers ?? 0;
  const lastMonthUsers = usersOverview?.summary.lastMonthUsers ?? 0;
  const usersPercent = getPercentChange(thisMonthUsers, lastMonthUsers);

  const thisMonthOrders = ordersOverview?.summary.thisMonthOrders ?? 0;
  const lastMonthOrders = ordersOverview?.summary.lastMonthOrders ?? 0;
  const monthlyOrdersPercent = getPercentChange(thisMonthOrders, lastMonthOrders);

  const lastWeekOrders = ordersOverview?.summary.lastWeekOrders ?? 0;
  const thisWeekPaidOrders = ordersOverview?.summary.thisWeekPaidOrders ?? 0;
  const lastWeekPaidOrders = ordersOverview?.summary.lastWeekPaidOrders ?? 0;
  const thisWeekOrders = ordersOverview?.summary.thisWeekOrders ?? 0;
  const thisWeekPaymentRate = thisWeekOrders > 0 ? (thisWeekPaidOrders / thisWeekOrders) * 100 : 0;
  const lastWeekPaymentRate = lastWeekOrders > 0 ? (lastWeekPaidOrders / lastWeekOrders) * 100 : 0;
  const paymentRateChange = thisWeekPaymentRate - lastWeekPaymentRate;

  // ===== آخرین سفارش‌ها (جدول) =====
  const latestOrdersForTable = mapLatestOrdersToTableRows(
    ordersOverview?.report?.latestOrders,
    4,
  );

  // ===== داده‌های PieChart (وضعیت سفارش‌ها) =====
  const orderStatusPieData = [
    {
      key: "pending",
      label: "در انتظار تایید",
      value: ordersOverview?.summary.pendingOrders ?? 0,
      color: "var(--color-warning)",
    },
    {
      key: "readyToShip",
      label: "آماده ارسال",
      value: ordersOverview?.summary.readyToShipOrders ?? 0,
      color: "var(--color-primary)",
    },
    {
      key: "delivered",
      label: "تحویل‌شده",
      value: ordersOverview?.summary.deliveredOrders ?? 0,
      color: "var(--color-success)",
    },
    {
      key: "returned",
      label: "مرجوع‌شده",
      value: ordersOverview?.summary.returnedOrders ?? 0,
      color: "var(--color-danger)",
    },
  ];

  // ===== دسته‌بندی‌های برتر (RadialChart) =====
  const topCategories = categoriesOverview?.charts?.topCategoriesChart?.slice(0, 4) ?? [];
  const totalProducts = topCategories.reduce((sum, cat) => sum + cat.products, 0);

  const radialData = topCategories.map((category, index) => ({
    key: `cat-${index}`,
    label: category.name,
    value: category.products,
    unitsSold: category.products,
    color: `var(--color-${["primary", "secondary", "warning", "success"][index % 4]})`,
  }));

  // ===== پرفروش‌ترین محصولات (RankingCard) =====
  const rankingItems =
    adminOverview?.topSellingMonthly?.items.map((item) => ({
      id: item.id,
      name: item.name,
      count: item.count,
      image: item.image,
    })) ?? [];

  const rankingPeriodOptions = PERSIAN_MONTHS.map((m) => ({
    value: m,
    label: m,
  }));

  // ===== هندلر تغییر ماه =====
  const handleMonthChange = (monthName: string) => {
    setSelectedMonthName(monthName);
  };

  return (
    <>
      {/* دکمه‌های افزودن */}
      <div className="flex flex-row gap-10">
        <AddButton
          text="افزودن محصول"
          action={() => router.push("/dashboard/products/create")}
        />
        <AddButton
          text="افزودن بلاگ"
          action={() => router.push("/dashboard/blogs/create")}
        />
        <AddButton
          text="افزودن دسته بندی"
          action={() => router.push("/dashboard/categories/create")}
        />
        <AddButton
          text="افزودن رنگ"
          action={() => router.push("/dashboard/colors/create")}
        />
        <AddButton
          text="افزودن سایز"
          action={() => router.push("/dashboard/sizes/create")}
        />
        <AddButton
          text="افزودن برند"
          action={() => router.push("/dashboard/brands/create")}
        />
        <AddButton
          text="افزودن بنر"
          action={() => router.push("/dashboard/banners/create")}
        />
      </div>

      {/* استت‌کارت‌ها */}
      <div className="flex gap-10">
        <StatCard
          title="فروش امروز"
          value={todayRevenue}
          valueType="price"
          percent={salesPercent}
          comparePeriod="day"
        />
        <StatCard
          title="تعداد سفارشات امروز"
          value={todayOrders}
          unit="سفارش"
          percent={ordersPercent}
          comparePeriod="day"
        />
        <StatCard
          title="مشتریان جدید"
          value={thisMonthUsers}
          unit="مشتری جدید"
          percent={usersPercent}
          comparePeriod="month"
        />
        <StatCard
          title="سفارشات این ماه"
          value={thisMonthOrders}
          unit="سفارش"
          percent={monthlyOrdersPercent}
          comparePeriod="month"
        />
        <StatCard
          title="پرداخت موفق این هفته"
          value={thisWeekPaymentRate}
          valueType="percent"
          percent={paymentRateChange}
          comparePeriod="week"
        />
      </div>

      {/* نمودارها */}
      <div className="flex items-stretch gap-10">
        <div className="flex w-[40%]">
          <BarChart
            title="گزارش فروش"
            subtitle="آمار فروش هفتگی"
            icon={<ReportIcon size="sm" color="text-secondary" />}
            data={paymentsOverview?.charts.weeklyIncomeChart ?? []}
          />
        </div>

        <div className="flex w-[60%]">
          <LineChart
            title="گزارش فروش"
            subtitle="آمار فروش ماهانه"
            icon={<ReportIcon size="sm" color="text-secondary" />}
            data={monthlySalesPoints}
            monthName={selectedMonthName}
            onMonthChange={handleMonthChange}
            valueSuffix="تومان"
            axisTitle="مبلغ"
            metricLabel="فروش"
            daysInMonth={monthlyRevenue?.daysInMonth}
          />
        </div>
      </div>

      {/* سفارش‌ها و وضعیت */}
      <div className="flex items-stretch gap-10">
        <div className="flex w-[60%]">
          <CustomTable
            title="آخرین سفارش‌ها"
            titleIcon={<FactorIcon size="sm" color="text-secondary" />}
            columns={ORDER_COLUMNS}
            rows={latestOrdersForTable}
            onViewAll={() => router.push("/dashboard/factors")}
          />
        </div>

        <div className="flex w-[40%]">
          <PieChartCard
            icon={<FactorIcon size="sm" color="text-secondary" />}
            title="وضعیت سفارش‌ها"
            data={orderStatusPieData}
            unit="سفارش"
          />
        </div>
      </div>

      {/* ردیف پایین */}
      <div className="flex items-stretch gap-10">
        <div className="flex w-[40%]">
          <RadialChart
            icon={<CategoryIcon size="sm" color="text-secondary" />}
            title="دسته بندی های برتر"
            periodLabel="بر اساس تعداد محصول"
            centerValue={totalProducts}
            centerUnit="محصول"
            data={radialData}
          />
        </div>

        <div className="flex w-[35%]">
          <RankingCard
            icon={<TimelineIcon size="sm" color="text-secondary" />}
            title="پرفروش‌ترین محصولات"
            periodLabel={selectedMonthName}
            periodOptions={rankingPeriodOptions}
            onPeriodChange={handleMonthChange}
            unit="عدد"
            items={rankingItems}
          />
        </div>

        <div className="flex w-[25%]">
          <ListCard
            icon={<BoxIcon size="sm" color="text-secondary" />}
            title="موجودی انبار"
            unit="عدد"
            items={inventoryItems}
            onButtonClick={() => router.push("/dashboard/products")}
          />
        </div>
      </div>
    </>
  );
}