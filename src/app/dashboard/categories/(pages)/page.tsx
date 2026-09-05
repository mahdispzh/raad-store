"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toJalaali } from "jalaali-js";

import { CustomTable } from "@/src/shared/components/custom-table/custom-table.ui";
import { TableColumn } from "@/src/shared/components/custom-table/table.types";
import { LineChart } from "@/src/shared/components/line-chart/line-chart.ui";
import { PieChartCard } from "@/src/shared/components/pie-chart/pie-chart.ui";
import { RankingCard } from "@/src/shared/components/ranking-card/ranking-card.ui";
import { StatCard } from "@/src/shared/components/stat-card/stat-card.ui";
import {
  CalendarIcon,
  CategoryIcon,
  ErrorIcon,
  LikeIcon,
  ProductIcon,
  ReportIcon,
  SuccessOutlineIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { mapRowsToJalaliDays, PERSIAN_MONTHS } from "@/src/shared/utils/analytics";
import { useCategoriesOverview } from "../_hooks/useCategoriesOverview";
import { useCategoriesMonthlyChart } from "../_hooks/useCategoriesMonthlyChart";
import { formatDateOnly } from "../../blogs/_utils/date.utils";
import { RadialChart } from "@/src/shared/components/radical-chart/radial-chart.ui";
import { RadialChartItem } from "@/src/shared/components/radical-chart/radial-chart.types";
import { SummaryCard } from "@/src/shared/components/summary-card/summary-card.ui";

// ========== ستون‌های جدول جدیدترین دسته‌بندی‌ها ==========
type NewestCategoryRow = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent: string;
  created_at: string;
};

const NEWEST_CATEGORIES_COLUMNS: TableColumn<NewestCategoryRow>[] = [
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
    header: "نام دسته‌بندی",
    align: "center",
    render: (row) => (
      <Text text={row.name} size="sm" color="secondary" align="center" />
    ),
  },
  {
    key: "parent",
    header: "دسته‌بندی والد",
    align: "center",
    render: (row) => (
      <Text
        text={row.parent || "اصلی"}
        size="sm"
        color="secondary"
        align="center"
      />
    ),
  },
  {
    key: "description",
    header: "توضیحات",
    align: "center",
    render: (row) => (
      <div className="max-w-[200px] truncate">
        <Text
          text={row.description || "-"}
          size="sm"
          color="secondary"
          align="center"
        />
      </div>
    ),
  },
  {
    key: "date",
    header: "تاریخ ایجاد",
    align: "center",
    render: (row) => (
      <Text
        text={formatDateOnly(row.created_at)}
        size="sm"
        color="secondary"
        align="center"
      />
    ),
  },
];

export default function CategoriesOverviewPage() {
  const router = useRouter();
  const { data } = useCategoriesOverview();

  // ماه جاری شمسی برای پیش‌فرض LineChart
  const currentJalaliMonth = PERSIAN_MONTHS[toJalaali(new Date()).jm - 1] ?? "فروردین";
  const [selectedMonth, setSelectedMonth] = useState<string | null>(currentJalaliMonth);

  const { data: monthlyChart } = useCategoriesMonthlyChart(selectedMonth);

  const summary = data?.summary;
  const report = data?.report;
  const charts = data?.charts;

  // ========== داده‌های StatCard ==========
const categorySummaryItems = [
  { id: "total", value: summary?.totalCategories ?? 0, label: "کل دسته‌بندی‌ها" },
  { id: "root", value: summary?.rootCategories ?? 0, label: "دسته‌بندی‌های اصلی" },
  { id: "child", value: summary?.childCategories ?? 0, label: "زیر‌دسته‌ها" },
  { id: "withProducts", value: summary?.categoriesWithProducts ?? 0, label: "دارای محصول" },
  { id: "empty", value: summary?.emptyCategories ?? 0, label: "بدون محصول" },
  { id: "avgProducts", value: summary?.averageProductsPerCategory ?? 0, label: "میانگین محصول" },
];
  // ========== داده‌های PieChart (دسته‌بندی‌های دارای محصول / بدون محصول) ==========
  const distributionPieData = useMemo(() => {
    const withProducts = summary?.categoriesWithProducts ?? 0;
    const empty = summary?.emptyCategories ?? 0;

    return [
      {
        key: "withProducts",
        label: "دارای محصول",
        value: withProducts,
        color: "var(--color-success)",
      },
      {
        key: "empty",
        label: "بدون محصول",
        value: empty,
        color: "var(--color-warning)",
      },
    ];
  }, [summary]);

  // ========== داده‌های PieChart (اصلی / فرعی) ==========
  const parentChildPieData = useMemo(() => {
    const root = summary?.rootCategories ?? 0;
    const child = summary?.childCategories ?? 0;

    return [
      {
        key: "root",
        label: "اصلی",
        value: root,
        color: "var(--color-primary)",
      },
      {
        key: "child",
        label: "فرعی",
        value: child,
        color: "var(--color-secondary)",
      },
    ];
  }, [summary]);

  // ========== داده‌های LineChart (روند ایجاد دسته‌بندی‌ها) ==========
  const lineChartData = useMemo(() => {
    if (selectedMonth && monthlyChart) {
      return monthlyChart.countByDay;
    }
    return charts?.categoriesLast30Days
      ? mapRowsToJalaliDays(charts.categoriesLast30Days)
      : [];
  }, [selectedMonth, monthlyChart, charts]);

  const daysInMonth = selectedMonth && monthlyChart ? monthlyChart.daysInMonth : undefined;

  // ========== داده‌های RankingCard (۱۰ دسته‌بندی با بیشترین محصول) ==========
  const rankingItems = useMemo(() => {
    if (!report?.largestCategories) return [];
    return report.largestCategories.map((category) => ({
      id: category.id,
      name: category.name,
      count: category._count.products,
      image: category.image ?? "",
    }));
  }, [report]);

  // ========== داده‌های CustomTable (جدیدترین دسته‌بندی‌ها) ==========
  const newestCategoriesRows: NewestCategoryRow[] = useMemo(() => {
    if (!report?.newestCategories) return [];
    return report.newestCategories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parent: category.parent_id ? "فرعی" : "اصلی", // ✅ اصلاح شده: parent_id وجود دارد
      created_at: category.created_at ?? "",
    }));
  }, [report]);
const categoryStatusData: RadialChartItem[] = useMemo(() => {
  const withProducts = summary?.categoriesWithProducts ?? 0;
  const empty = summary?.emptyCategories ?? 0;
  const root = summary?.rootCategories ?? 0;
  const child = summary?.childCategories ?? 0;

  const total = withProducts + empty + root + child;

  const items = [
    { key: "withProducts", label: "دارای محصول", unitsSold: withProducts },
    { key: "empty", label: "بدون محصول", unitsSold: empty },
    { key: "root", label: "اصلی", unitsSold: root },
    { key: "child", label: "فرعی", unitsSold: child },
  ];

  return items.map((item) => ({
    ...item,
    value: total > 0 ? (item.unitsSold / total) * 100 : 0,
  }));
}, [summary]);
  return (
    <>
      {/* ===== ردیف اول: StatCard‌ها (۶ کارت) ===== */}
    <SummaryCard
  title=" دسته‌بندی‌ها"
  titleIcon={<ReportIcon size="sm" color="text-secondary" />}
  items={[
    {
      value: summary?.totalCategories ?? 0,
      label: "کل دسته‌بندی‌ها",
      icon: <CategoryIcon size="sm" color="text-secondary" />,
    },
    {
      value: summary?.rootCategories ?? 0,
      label: "دسته‌بندی‌های اصلی",
      icon: <CategoryIcon size="sm" color="text-secondary" />,
    },
    {
      value: summary?.childCategories ?? 0,
      label: "زیر‌دسته‌ها",
      icon: <CategoryIcon size="sm" color="text-secondary" />,
    },
    {
      value: summary?.categoriesWithProducts ?? 0,
      label: "دارای محصول",
      icon: <SuccessOutlineIcon size="sm" color="text-secondary" />,
    },
    {
      value: summary?.emptyCategories ?? 0,
      label: "بدون محصول",
      icon: <ErrorIcon size="sm" color="text-secondary" />,
    },
    {
      value: summary?.averageProductsPerCategory ?? 0,
      label: "میانگین محصول",
      icon: <ProductIcon size="sm" color="text-secondary" />,
    },
  ]}
/>

      {/* ===== ردیف دوم: دو PieChart (دوتا کنار هم) ===== */}
      <div className="mt-10 flex items-stretch gap-10">
       <div className="flex w-[45%] min-w-0">
  <RadialChart
  icon={<CategoryIcon size="sm" color="text-secondary" />}
  title="وضعیت دسته‌بندی‌ها"
  periodLabel="کل دسته‌بندی‌ها"
  data={categoryStatusData}
  centerValue={summary?.totalCategories ?? 0}
  centerUnit="دسته"
/>
        </div>
                 <div className="flex w-[55%]">

 <LineChart
          title="روند ایجاد دسته‌بندی‌ها"
          subtitle="ماهانه"
          icon={<ReportIcon size="sm" color="text-secondary" />}
          data={lineChartData}
          daysInMonth={daysInMonth}
          valueSuffix="دسته"
          axisTitle="تعداد"
          metricLabel="دسته‌بندی‌ها"
          monthName={selectedMonth ?? undefined}
          onMonthChange={(month) => setSelectedMonth(month)}
        />
        </div>
      </div>

      {/* ===== ردیف چهارم: RankingCard (بیشترین محصول) + CustomTable (جدیدترین) ===== */}
      <div className="mt-10 flex items-stretch gap-10">
        <div className="flex w-[30%]">
          <RankingCard
            icon={<LikeIcon size="sm" color="text-secondary" />}
            title="۱۰ دسته‌بندی با بیشترین محصول"
            periodLabel="کل بازه"
            unit="محصول"
            items={rankingItems}
            itemsPerPage={2}
          />
        </div>

        <div className="flex w-[70%]">
          <CustomTable
            title="جدیدترین دسته‌بندی‌ها"
            titleIcon={<LikeIcon size="sm" color="text-secondary" />}
            columns={NEWEST_CATEGORIES_COLUMNS}
            rows={newestCategoriesRows}
            onViewAll={() => router.push("/dashboard/categories/list")}
            showViewAll
            viewAllLabel="مشاهده همه"
            emptyText="هیچ دسته‌بندی یافت نشد"
          />
        </div>
      </div>
    </>
  );
}