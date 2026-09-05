"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toJalaali } from "jalaali-js";

import { CustomTable } from "@/src/shared/components/custom-table/custom-table.ui";
import { TableColumn } from "@/src/shared/components/custom-table/table.types";
import { LineChart } from "@/src/shared/components/line-chart/line-chart.ui";
import { ListCard } from "@/src/shared/components/list-card/list-card.ui";
import { PieChartCard } from "@/src/shared/components/pie-chart/pie-chart.ui";
import { StatCard } from "@/src/shared/components/stat-card/stat-card.ui";
import {
  CalendarIcon,
  FactorIcon,
  InventoryIcon,
  LocationIcon,
  ReportIcon,
  UserIcon,
  UsersIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { mapRowsToJalaliDays, PERSIAN_MONTHS } from "@/src/shared/utils/analytics";
import { useUsersMonthlyChart } from "../_hooks/useUsersMonthlyChart";
import { useUsersOverview } from "../_hooks/useUsersOverview";
import { formatLastActivity } from "../_utils/format-date";
import { AVATAR_OPTIONS, DEFAULT_AVATAR } from "../../profile/_constants/avatars";

// ========== ستون‌های جدول مشتریان برتر ==========
type TopCustomerRow = {
  id: number;
  name: string;
  phone: string;
  orders: number;
  lastActivity: string;
};

const TOP_CUSTOMERS_COLUMNS: TableColumn<TopCustomerRow>[] = [
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
    key: "name",
    header: "نام کاربر",
    align: "center",
    render: (row) => (
      <Text text={row.name} size="sm" color="secondary" align="center" />
    ),
  },
  {
    key: "phone",
    header: "شماره تماس",
    align: "center",
    render: (row) => (
      <Text text={row.phone} size="sm" color="secondary" align="center" />
    ),
  },
  {
    key: "orders",
    header: "تعداد سفارش",
    align: "center",
    render: (row) => (
      <Text text={String(row.orders)} size="sm" color="secondary" align="center" />
    ),
  },
  {
    key: "lastActivity",
    header: "آخرین فعالیت",
    align: "center",
    render: (row) => (
      <Text text={row.lastActivity} size="sm" color="secondary" align="center" />
    ),
  },
];

export default function UsersOverviewPage() {
  const router = useRouter();
  const { data } = useUsersOverview();

  // ماه جاری شمسی برای پیش‌فرض LineChart
  const currentJalaliMonth = PERSIAN_MONTHS[toJalaali(new Date()).jm - 1] ?? "فروردین";
  const [selectedMonth, setSelectedMonth] = useState<string | null>(currentJalaliMonth);

  const { data: monthlyChart } = useUsersMonthlyChart(selectedMonth);

  const summary = data?.summary;
  const report = data?.report;
  const charts = data?.charts;

  // ========== آمارهای StatCard ==========
  const statItems = [
    {
      id: "total",
      title: "تعداد کل کاربران",
      value: summary?.totalUsers ?? 0,
      valueType: "custom" as const,
      unit: "نفر",
      // رشد کل کاربران بر اساس سرعت ثبت‌نام این ماه نسبت به ماه قبل سنجیده می‌شه
      percent: summary?.monthGrowthPercent ?? 0,
      comparePeriod: "month" as const,
    },
    {
      id: "today",
      title: "کاربران جدید امروز",
      value: summary?.todayUsers ?? 0,
      valueType: "custom" as const,
      unit: "نفر",
      percent: summary?.todayGrowthPercent ?? 0,
      comparePeriod: "day" as const,
    },
    {
      id: "month",
      title: "کاربران جدید این ماه",
      value: summary?.thisMonthUsers ?? 0,
      valueType: "custom" as const,
      unit: "نفر",
      percent: summary?.monthGrowthPercent ?? 0,
      comparePeriod: "month" as const,
    },
    {
      id: "orders",
      title: "کاربران دارای سفارش",
      value: summary?.usersWithOrders ?? 0,
      valueType: "custom" as const,
      unit: "نفر",
      // رشد این کارت بر اساس تعداد سفارش‌های ثبت‌شده در این ماه نسبت به ماه قبل سنجیده می‌شه
      percent: summary?.ordersGrowthPercent ?? 0,
      comparePeriod: "month" as const,
    },
    {
      id: "address",
      title: "کاربران دارای آدرس",
      value: summary?.usersWithAddress ?? 0,
      valueType: "custom" as const,
      unit: "نفر",
      // رشد این کارت بر اساس تعداد آدرس‌های ثبت‌شده در این ماه نسبت به ماه قبل سنجیده می‌شه
      percent: summary?.addressGrowthPercent ?? 0,
      comparePeriod: "month" as const,
    },
  ];

  // ========== داده‌های LineChart ==========
  const lineChartData = useMemo(() => {
    if (selectedMonth && monthlyChart) {
      return monthlyChart.countByDay;
    }
    return charts?.usersLast30Days
      ? mapRowsToJalaliDays(charts.usersLast30Days)
      : [];
  }, [selectedMonth, monthlyChart, charts]);

  const daysInMonth = selectedMonth && monthlyChart ? monthlyChart.daysInMonth : undefined;

  // ========== داده‌های PieChart ==========
const pieData = useMemo(() => {
  const distribution = charts?.usersOrderDistribution ?? [];
  const KEY_MAP: Record<string, string> = {
    "دارای سفارش": "withOrder",
    "بدون سفارش": "withoutOrder",
  };
  return distribution.map((item) => ({
    key: KEY_MAP[item.name] ?? item.name.replace(/\s+/g, "-"),
    label: item.name,
    value: item.value,
    color: item.name === "دارای سفارش" ? "var(--color-primary)" : "var(--color-secondary)",
  }));
}, [charts]);

  // ========== داده‌های جدول مشتریان برتر ==========
  const topCustomersRows: TopCustomerRow[] = useMemo(() => {
    if (!report?.topCustomers) return [];
    return report.topCustomers.map((user) => ({
      id: user.id,
      name: user.name ?? user.phone ?? `کاربر ${user.id}`,
      phone: user.phone ?? "-",
      orders: user._count.orders,
     lastActivity: user.orders?.[0]?.created_at
  ? formatLastActivity(user.orders[0].created_at)
  : "بدون فعالیت",
    }));
  }, [report]);
function getAvatarSrc(imageId: number): string {
  return (
    AVATAR_OPTIONS.find((avatar) => avatar.id === imageId)?.src ??
    DEFAULT_AVATAR
  );
}

  // ========== داده‌های ListCard ==========

const newestUsersItems = useMemo(() => {
  if (!report?.newestUsers) return [];
  return report.newestUsers.map((user) => ({
    id: user.id,
    name: user.name ?? user.phone ?? `کاربر ${user.id}`,
    count: user.name ?? "کاربر جدید", // ✅ به‌جای 0
    image: getAvatarSrc(user.image_id),
  }));
}, [report]);
  return (
    <>
      {/* ===== ردیف اول: StatCard‌ها ===== */}
      <div className="flex flex-wrap gap-6">
        {statItems.map((item) => (
          <div key={item.id} className="flex-1 min-w-[150px]">
            <StatCard
              title={item.title}
              value={item.value}
              valueType={item.valueType}
              unit={item.unit}
              percent={item.percent}
              comparePeriod={item.comparePeriod}
            />
          </div>
        ))}
      </div>

      {/* ===== ردیف دوم: LineChart ===== */}
      <div className="mt-10 flex items-stretch gap-10">
                <div className="flex w-[60%]">
                   <LineChart
          title="روند ثبت‌نام کاربران"
          subtitle="ماهانه"
          icon={<ReportIcon size="sm" color="text-secondary" />}
          data={lineChartData}
          daysInMonth={daysInMonth}
          valueSuffix="نفر"
          axisTitle="تعداد"
          metricLabel="کاربران"
          monthName={selectedMonth ?? undefined}
          onMonthChange={(month) => setSelectedMonth(month)}
        />
</div>
<div className="flex w-[40%]">
       <PieChartCard
            icon={<UsersIcon size="sm" color="text-secondary" />}
            title="کاربران دارای سفارش"
            data={pieData}
            unit="نفر"
          />
</div>
       
       
      </div>

      {/* ===== ردیف سوم: PieChart + ListCard (دو ستونه) ===== */}
      <div className="mt-10 flex items-stretch gap-10">
        <div className="flex w-[70%]">
             <CustomTable
          title=" مشتریان برتر"
          titleIcon={<FactorIcon size="sm" color="text-secondary" />}
          columns={TOP_CUSTOMERS_COLUMNS}
          rows={topCustomersRows}
          onViewAll={() => router.push("/dashboard/users/list")}
          showViewAll
          viewAllLabel="مشاهده همه"
          emptyText="هیچ مشتری برتری یافت نشد"
          

        />
        </div>
        <div className="flex w-[30%]">
          <ListCard
            icon={<UserIcon size="sm" color="text-secondary" />}
            title="کاربران جدید"
            unit=""
            items={newestUsersItems}
            onButtonClick={() => router.push("/dashboard/users/list")}
          />
        </div>
      </div>

      {/* ===== ردیف چهارم: CustomTable مشتریان برتر ===== */}
      <div className="mt-10 flex w-full">
     
      </div>
    </>
  );
}