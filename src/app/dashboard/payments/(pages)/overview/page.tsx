// page.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { BarChart } from "@/src/shared/components/bar-chart/bar-chart.ui";
import { CustomTable } from "@/src/shared/components/custom-table/custom-table.ui";
import { TableColumn } from "@/src/shared/components/custom-table/table.types";
import { LineChart } from "@/src/shared/components/line-chart/line-chart.ui";
import type { PieChartItem } from "@/src/shared/components/pie-chart/pie-chart.types";
import { PieChartCard } from "@/src/shared/components/pie-chart/pie-chart.ui";
import { StatCard } from "@/src/shared/components/stat-card/stat-card.ui";
import { ReportIcon } from "@/src/shared/constants/icons";
import { PaymentBadge } from "@/src/shared/ui/payment-badge/payment-status-badge.ui";
import {
  getCurrentJalaliYear,
  getJalaliMonthNumber,
} from "@/src/shared/utils/analytics";
import { getPaymentsOverview } from "../../_services/payments-overview.api";
import {
  mapLatestPaymentsToTableRows,
  type PaymentTableRow,
} from "../../_utils/map-payment-to-table";
import { useRouter } from "next/navigation";

const PAYMENT_STATUS_MAP: Record<
  number,
  { label: string; color: "success" | "danger" | "gray" }
> = {
  0: { label: "در انتظار", color: "gray" },
  1: { label: "موفق", color: "success" },
  2: { label: "ناموفق", color: "danger" },
  3: { label: "نامشخص", color: "gray" },
};

// ترتیبش دقیقاً با charts.paymentStatusChart از بک‌اند هماهنگه: موفق، ناموفق، در انتظار، نامشخص
const PAYMENT_STATUS_KEYS = ["successful", "failed", "pending", "unspecified"];

const paymentColumns: TableColumn<PaymentTableRow>[] = [
  { key: "rowNumber", header: "ردیف", align: "center" },
  { key: "paymentNumber", header: "شماره تراکنش", align: "center" },
  { key: "date", header: "تاریخ", align: "center" },
  { key: "time", header: "ساعت", align: "center" },
  { key: "amount", header: "مبلغ (تومان)", align: "center" },
  { key: "method", header: "روش پرداخت", align: "center" },
  {
    key: "status",
    header: "وضعیت",
    align: "center",
    render: (row) => {
      const status = PAYMENT_STATUS_MAP[row.status] ?? PAYMENT_STATUS_MAP[3]!;

      return <PaymentBadge text={status.label} color={status.color} />;
    },
  },
];

function getCurrentPersianMonthName(): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
  }).format(new Date());
}

export default function DashboardPayments() {
  // ✅ جدید — ماهی که تو LineChart انتخاب شده؛ پیش‌فرض ماه شمسی جاری.
  // ⚠️ فرض: چون MonthDropdown سال نداره و فقط اسم ماه می‌ده، فعلاً فقط
  // ماه‌های سالِ جاری قابل انتخابن (jalaaliYear ثابت می‌مونه).
  const [selectedMonthName, setSelectedMonthName] = useState(
    getCurrentPersianMonthName(),
  );
  const jalaaliYear = getCurrentJalaliYear();
  const jalaaliMonth = getJalaliMonthNumber(selectedMonthName) ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ["payments-overview", jalaaliYear, jalaaliMonth],
    queryFn: () => getPaymentsOverview(jalaaliYear, jalaaliMonth),
  });

  if (isLoading || !data) return null; // TODO: اسکلتون لودینگ در صورت نیاز

  const { summary, charts, report } = data;

  // ماه جاری اولین آیتم monthlyIncome هست چون کوئری بر اساس ماه DESC مرتب شده
  const currentMonthIncome = charts.monthlyIncome[0]?.income ?? 0;

  // گزارش فروش روزانه (BarChart) — بر اساس روزهای هفته
  const totalWeeklyIncome = charts.weeklyIncomeChart.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  const totalDailyIncome = charts.dailyIncomeChart.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // ✅ به‌جای incomeLast30Days (بازه‌ی غلتان ۳۰ روزه‌ی بی‌ربط به ماه انتخابی)،
  // حالا charts.incomeByDay مصرف می‌شه که دقیقاً برای jalaaliYear/jalaaliMonth ساخته می‌شه
  const monthlyIncomePoints = charts.incomeByDay ?? [];

  // آخرین پرداخت‌ها
  const latestPaymentsRows = mapLatestPaymentsToTableRows(
    report?.latestPayments,
    10,
  );

  // وضعیت پرداخت‌ها
  const paymentStatusPieData: PieChartItem[] = charts.paymentStatusChart.map(
    (item, index) => ({
      key: PAYMENT_STATUS_KEYS[index] ?? `status-${index}`,
      label: item.name,
      value: item.value,
    }),
  );
  const router = useRouter();

  return (
    <>
      <div className="flex gap-10">
        <StatCard
          title="درآمد ماهانه"
          value={currentMonthIncome}
          valueType="price"
          percent={summary.monthlyIncomeGrowth}
          comparePeriod="month"
        />
        <StatCard
          title="درآمد امروز"
          value={summary.todayIncome}
          valueType="price"
          percent={summary.todayIncomeGrowth}
          comparePeriod="day"
        />
        <StatCard
          title="میانگین پرداخت روزانه"
          value={summary.averageDailyIncome}
          valueType="price"
          percent={summary.averageDailyIncomeGrowth}
          comparePeriod="month"
        />
        <StatCard
          title="تعداد کل پرداخت‌ها"
          value={summary.totalPayments}
          unit="پرداخت"
          percent={summary.totalPaymentsGrowth}
          comparePeriod="month"
        />
        <StatCard
          title="تعداد پرداخت‌های موفق"
          value={summary.successfulPayments}
          unit="پرداخت"
          percent={summary.successfulPaymentsGrowth}
          comparePeriod="month"
        />
      </div>

      <div className="flex items-stretch gap-10">
        {/* BarChart — گزارش فروش روزانه (درآمد روزانه) */}
        <div className="flex w-[55%]">
          <BarChart
            title="گزارش فروش"
            subtitle="آمار فروش روزانه"
            icon={<ReportIcon size="sm" color="text-secondary" />}
            data={charts.dailyIncomeChart}
          />
        </div>

        {/* LineChart — گزارش فروش ماه شمسیِ انتخاب‌شده */}
        <div className="flex w-[60%]">
          <LineChart
            title="گزارش فروش"
            subtitle="آمار فروش  ماهانه"
            icon={<ReportIcon size="sm" color="text-secondary" />}
            data={monthlyIncomePoints}
            monthName={selectedMonthName}
            onMonthChange={setSelectedMonthName}
            daysInMonth={charts.daysInMonth ?? undefined}
            valueSuffix="تومان"
            axisTitle="روند فروش"
            metricLabel="درآمد"
          />
        </div>
      </div>

      <div className="flex items-stretch gap-10">
        {/* Table — آخرین پرداخت‌ها */}
        <div className="flex w-[60%]">
          <CustomTable
            title="آخرین پرداخت‌ها"
            titleIcon={<ReportIcon size="sm" color="text-secondary" />}
            columns={paymentColumns}
            rows={latestPaymentsRows}
            getRowKey={(row) => row.paymentNumber}
            showViewAll
            onViewAll={() => router.push("/dashboard/blogs/list")}
          />
        </div>

        {/* PieChart — وضعیت پرداخت‌ها */}
        <div className="flex w-[40%]">
          <PieChartCard
            icon={<ReportIcon size="sm" color="text-secondary" />}
            title="وضعیت پرداخت‌ها"
            data={paymentStatusPieData}
            unit="پرداخت"
          />
        </div>
      </div>
    </>
  );
}