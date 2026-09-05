// app/dashboard/orders/page.tsx
"use client";

import { useRouter } from "next/navigation";

import { BarChart } from "@/src/shared/components/bar-chart/bar-chart.ui";
import { CustomTable } from "@/src/shared/components/custom-table/custom-table.ui";
import {
  mapLatestOrdersToTableRows,
  OrderTableRow,
} from "@/src/shared/components/custom-table/map-order-to-table";
import { TableColumn } from "@/src/shared/components/custom-table/table.types";
import { LineChart } from "@/src/shared/components/line-chart/line-chart.ui";
import type { PieChartItem } from "@/src/shared/components/pie-chart/pie-chart.types";
import { PieChartCard } from "@/src/shared/components/pie-chart/pie-chart.ui";
import { RankingCard } from "@/src/shared/components/ranking-card/ranking-card.ui";
import type { RankingItem } from "@/src/shared/components/ranking-card/ranking-card.types";
import { StatCard } from "@/src/shared/components/stat-card/stat-card.ui";
import { SummaryCard } from "@/src/shared/components/summary-card/summary-card.ui";
import {
  AdminIcon,
  CheckIcon,
  ClockIcon,
  DocumentIcon,
  FactorIcon,
  ProductIcon,
  ReportIcon,
  ReturnIcon,
  TimelineIcon,
  TruckIcon,
  WaitingIcon,
} from "@/src/shared/constants/icons";
import { OrderStatusBadge, Text } from "@/src/shared/ui";
import { getPercentChange } from "@/src/shared/utils/percent-change";
import { useOrderMonthlyRevenueChart, useOrdersOverview } from "../../_hooks/useOrdersOverview";
import { RadialChartItem } from "@/src/shared/components/radical-chart/radial-chart.types";
import { RadialChart } from "@/src/shared/components/radical-chart/radial-chart.ui";

// ===== ستون‌های جدول «آخرین سفارش‌ها» =====
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

const PIE_STATUS_KEYS = [
  "pending",
  "confirmed",
  "preparing",
  "readyToShip",
  "shipped",
  "delivered",
  "returned",
];

// ⚠️ فعلاً جایی مصرف نمی‌شه؛ برای هماهنگی با paymentRadialData به ۴ حالت به‌روز شد
const PIE_PAYMENT_KEYS = ["paid", "unpaid", "failed", "unspecified"];

const toFaNumber = (value: number) => value.toLocaleString("fa-IR");

export default function DashboardOrders() {
  const router = useRouter();
  const { data, isLoading } = useOrdersOverview();
  const monthlyRevenueChart = useOrderMonthlyRevenueChart();

  if (isLoading || !data) return null; // TODO: اسکلتون لودینگ در صورت نیاز

  const { summary, report, charts } = data;

  // ---------- استت‌کارت‌های رشد ----------
  const salesPercent = getPercentChange(
    summary.todayRevenue,
    summary.yesterdayRevenue,
  );
  const ordersPercent = getPercentChange(
    summary.todayOrders,
    summary.yesterdayOrders,
  );
  const weeklyOrdersPercent = getPercentChange(
    summary.thisWeekOrders,
    summary.lastWeekOrders,
  );
  const monthlyOrdersPercent = getPercentChange(
    summary.thisMonthOrders,
    summary.lastMonthOrders,
  );
  const avgOrderValuePercent = getPercentChange(
    summary.thisMonthAverageOrderValue,
    summary.lastMonthAverageOrderValue,
  );

  const thisWeekPaymentRate =
    summary.thisWeekOrders > 0
      ? (summary.thisWeekPaidOrders / summary.thisWeekOrders) * 100
      : 0;
  const lastWeekPaymentRate =
    summary.lastWeekOrders > 0
      ? (summary.lastWeekPaidOrders / summary.lastWeekOrders) * 100
      : 0;
  const paymentRateChange = thisWeekPaymentRate - lastWeekPaymentRate;

  // جدول آخرین سفارش‌ها
  const latestOrdersRows = mapLatestOrdersToTableRows(report?.latestOrders, 8);

  // ---------- وضعیت پرداخت برای RadialChart (تکراری با SummaryCard نیست؛ SummaryCard فقط مراحل سفارش رو نشون می‌ده) ----------
  // ✅ payment_status چهار حالته (۰=در انتظار، ۱=موفق، ۲=ناموفق، ۳=نامشخص)؛
  // قبلاً فقط paid/unpaid حساب می‌شد و failedPaymentOrders/unspecifiedPaymentOrders نادیده گرفته می‌شدن
  const totalPaymentOrders =
    summary.paidOrders +
    summary.unpaidOrders +
    summary.failedPaymentOrders +
    summary.unspecifiedPaymentOrders;

  const paymentStatusItems: { key: string; label: string; unitsSold: number }[] = [
    { key: "paid", label: "پرداخت شده", unitsSold: summary.paidOrders },
    { key: "unpaid", label: "در انتظار ", unitsSold: summary.unpaidOrders },
    { key: "failed", label: "ناموفق", unitsSold: summary.failedPaymentOrders },
    {
      key: "unspecified",
      label: "نامشخص",
      unitsSold: summary.unspecifiedPaymentOrders,
    },
  ];

  const paymentRadialData: RadialChartItem[] = paymentStatusItems.map((item) => ({
    key: item.key,
    label: item.label,
    // ⚠️ اینجا نباید گرد بشه — گرد کردن سهم‌های خیلی کوچیک (مثلاً ۰.۴٪) رو به صفر
    // می‌رسونه و قوسشون توی حلقه کاملاً ناپدید می‌شه، با اینکه legend عدد واقعی
    // (unitsSold) رو درست نشون می‌ده. برای پهنای قوس باید نسبت واقعی/اعشاری بمونه.
    value:
      totalPaymentOrders > 0
        ? (item.unitsSold / totalPaymentOrders) * 100
        : 0,
    unitsSold: item.unitsSold,
  }));

  // ---------- روند سفارش‌ها → درآمد هفتگی (BarChart واحدش «تومان» ثابته، پس باید مبلغ بدیم نه تعداد) ----------
  // charts.weeklyRevenueChart از قبل توسط بک‌اند محاسبه می‌شه (شنبه..جمعه، ۷ روز اخیر) و جای دیگه‌ای مصرف نمی‌شد
  const weeklyRevenueBarData = charts.weeklyRevenueChart;

  // ---------- برترین مشتریان → بر اساس بیشترین مبلغ سفارش، نه صرفاً تعداد ----------
  // charts.topCustomersChart قبلاً فقط "تعداد سفارش" داشت؛ report.highestValueOrders
  // مبلغ واقعی هر سفارش رو داره و اطلاعات بامعناتری برای «برترین مشتریان» به دست می‌ده
  const topCustomersRanking: RankingItem[] = (report?.highestValueOrders ?? [])
  .slice(0, 8)
  .map((order, index) => ({
    id: order.id ?? index,
    name: order.users?.name ?? order.users?.phone ?? "بدون نام",
    count: order.total_price ?? 0,
    // ✅ عکس اولین آیتم سفارش، نه آواتار مشتری
    image: order.order_items?.[0]?.products?.images?.[0] || "/images/image32.svg",
  }));

  return (
    <>
      {/* خلاصه وضعیت سفارش‌ها بر اساس مرحله */}
      <SummaryCard
        title=" وضعیت سفارش‌ها"
        titleIcon={<DocumentIcon size="sm" color="text-secondary" />}
        items={[
          {
            value: summary.pendingOrders,
            label: "منتظر تایید",
            icon: <ClockIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.confirmedOrders,
            label: "تایید اولیه",
            icon: <CheckIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.preparingOrders,
            label: "در حال آماده‌سازی",
            icon: <WaitingIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.readyToShipOrders,
            label: "آماده ارسال",
            icon: <ProductIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.shippedOrders,
            label: "تحویل به پست",
            icon: <TruckIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.deliveredOrders,
            label: "تحویل به مشتری",
            icon: <AdminIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.returnedOrders,
            label: "مرجوع شده",
            icon: <ReturnIcon size="sm" color="text-secondary" />,
          },
        ]}
      />

      {/* آخرین سفارش‌ها (۶۰٪) + وضعیت پرداخت (۴۰٪) */}
      <div className="flex items-stretch gap-10">
        <div className="flex w-[65%]">
          <CustomTable
            title="آخرین سفارش‌ها"
            titleIcon={<FactorIcon size="sm" color="text-secondary" />}
            columns={ORDER_COLUMNS}
            rows={latestOrdersRows}
            onViewAll={() => router.push("/dashboard/orders/list")}
          />
        </div>

        <div className="flex w-[35%]">
          <RadialChart
            icon={<ReportIcon size="sm" color="text-secondary" />}
            title="وضعیت سفارش ها"
            periodLabel={monthlyRevenueChart.monthName}
            data={paymentRadialData}
            centerValue={totalPaymentOrders}
            centerUnit="سفارش"
          />
        </div>
      </div>

      {/* روند فروش هفتگی (۴۰٪) + برترین مشتریان (۶۰٪) */}
      <div className="flex items-stretch gap-10">
        <div className="flex w-[40%]">
          <BarChart
            title="روند سفارش‌ها"
            subtitle="درآمد ۷ روز اخیر به تفکیک روز هفته"
            icon={<ReportIcon size="sm" color="text-secondary" />}
            data={weeklyRevenueBarData}
          />
        </div>

        <div className="flex w-[60%]">
          <RankingCard
            icon={<TimelineIcon size="sm" color="text-secondary" />}
            title="برترین سفارش ها"
            periodLabel="پرمبلغ‌ترین سفارش‌ها"
            items={topCustomersRanking}
            unit="تومان"
            itemsPerPage={4}
          />
        </div>
      </div>
    </>
  );
}