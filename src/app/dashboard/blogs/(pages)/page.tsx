"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toJalaali } from "jalaali-js";

import { CustomTable } from "@/src/shared/components/custom-table/custom-table.ui";
import { TableColumn } from "@/src/shared/components/custom-table/table.types";
import { BarChart } from "@/src/shared/components/bar-chart/bar-chart.ui";
import { LineChart } from "@/src/shared/components/line-chart/line-chart.ui";
import { ListCard } from "@/src/shared/components/list-card/list-card.ui";
import { RankingCard } from "@/src/shared/components/ranking-card/ranking-card.ui";
import { StatCard } from "@/src/shared/components/stat-card/stat-card.ui";
import {
  BookIcon,
  CalendarIcon,
  CommentIcon,
  EyeIcon,
  LikeIcon,
  PencilIcon,
  ReportIcon,
  UserIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { mapRowsToJalaliDays, PERSIAN_MONTHS } from "@/src/shared/utils/analytics";
import { formatDateOnly } from "../_utils/date.utils";
import { useBlogsOverview } from "../_hooks/useBlogsOverview";
import { useBlogsMonthlyChart } from "../_hooks/useBlogsMonthlyChart";
import { RadialChart } from "@/src/shared/components/radical-chart/radial-chart.ui";
import { AVATAR_OPTIONS, DEFAULT_AVATAR } from "../../profile/_constants/avatars";
import { BlogStatusBadge } from "@/src/shared/ui/blog-status-badge/blog-status-badge.ui";
import { BlogStatus } from "@/src/shared/ui/blog-status-badge/blog-status-badge.types";

// ========== ستون‌های جدول جدیدترین وبلاگ‌ها ==========
type NewestBlogRow = {
  id: number;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  views: number;
  likes: number;
  comments: number;
};

// ✅ هر ۴ وضعیت (قبلاً فقط ۰ و ۱ بود)

function getAvatarSrc(imageId: number): string {
  return (
    AVATAR_OPTIONS.find((avatar) => avatar.id === imageId)?.src ??
    DEFAULT_AVATAR
  );
}
const NEWEST_BLOGS_COLUMNS: TableColumn<NewestBlogRow>[] = [
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
    key: "title",
    header: "عنوان بلاگ",
    align: "center",
    render: (row) => (
      <div className="max-w-[180px] truncate">
        <Text text={row.title} size="sm" color="secondary" align="center" />
      </div>
    ),
  },{
    key: "status",
    header: "وضعیت",
    align: "center",
    render: (row) => (
      <BlogStatusBadge status={Number(row.status) as BlogStatus} />
    ),
  },
  {
    key: "views",
    header: "بازدید",
    align: "center",
    render: (row) => (
      <Text
        text={row.views.toLocaleString("fa-IR")}
        size="sm"
        color="secondary"
        align="center"
      />
    ),
  },
  {
    key: "likes",
    header: "لایک",
    align: "center",
    render: (row) => (
      <Text
        text={row.likes.toLocaleString("fa-IR")}
        size="sm"
        color="secondary"
        align="center"
      />
    ),
  },
  {
    key: "comments",
    header: "کامنت",
    align: "center",
    render: (row) => (
      <Text
        text={row.comments.toLocaleString("fa-IR")}
        size="sm"
        color="secondary"
        align="center"
      />
    ),
  },
  {
    key: "date",
    header: "تاریخ انتشار",
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

// ✅ هر ۴ وضعیت برای RadialChart (قبلاً فقط published/draft بود)
const BLOG_STATUS_KEYS = ["draft", "published", "scheduled", "unpublished"] as const;
type BlogStatusKey = (typeof BLOG_STATUS_KEYS)[number];

const BLOG_STATUS_LABELS: Record<BlogStatusKey, string> = {
  draft: "پیش‌نویس",
  published: "منتشر شده",
  scheduled: "زمان‌بندی شده",
  unpublished: "منتشر نشده",
};

// ⚠️ فقط این ۴ رنگ توی radial-chart.constants.tsx واقعاً تعریف شدن؛
// قبلاً از --color-info و --color-destructive استفاده کرده بودم که
// توی پروژه وجود نداشتن و باعث می‌شد دایره‌ی رنگی کنار «زمان‌بندی شده»
// و «منتشر نشده» اصلاً رندر نشه (چون CSS variable نامعتبر بود)
const BLOG_STATUS_COLORS: Record<BlogStatusKey, string> = {
  draft: "var(--color-warning)",
  published: "var(--color-success)",
  scheduled: "var(--color-primary)",
  unpublished: "var(--color-danger)",
};

export default function BlogsOverviewPage() {
  const router = useRouter();
  const { data } = useBlogsOverview();

  // ماه جاری شمسی برای پیش‌فرض LineChart
  const currentJalaliMonth = PERSIAN_MONTHS[toJalaali(new Date()).jm - 1] ?? "فروردین";
  const [selectedMonth, setSelectedMonth] = useState<string | null>(currentJalaliMonth);

  const { data: monthlyChart } = useBlogsMonthlyChart(selectedMonth);

  const summary = data?.summary;
  const report = data?.report;
  const charts = data?.charts;

  // ========== داده‌های StatCard ==========
  // ✅ percent از summary.monthGrowthPercent میاد، نه هاردکد صفر
  const statItems = [
    {
      id: "total",
      title: "تعداد کل وبلاگ‌ها",
      value: summary?.totalBlogs ?? 0,
      valueType: "custom" as const,
      unit: "بلاگ",
      percent: summary?.monthGrowthPercent ?? 0,
      comparePeriod: "month" as const,
    },
    {
      id: "published",
      title: "وبلاگ‌های منتشرشده",
      value: summary?.publishedBlogs ?? 0,
      valueType: "custom" as const,
      unit: "بلاگ",
      percent: summary?.monthGrowthPercent ?? 0,
      comparePeriod: "month" as const,
    },
    {
      id: "draft",
      title: "پیش‌نویس‌ها",
      value: summary?.draftBlogs ?? 0,
      valueType: "custom" as const,
      unit: "بلاگ",
      percent: summary?.monthGrowthPercent ?? 0,
      comparePeriod: "month" as const,
    },
    {
      id: "views",
      title: "مجموع بازدیدها",
      value: summary?.totalViews ?? 0,
      valueType: "custom" as const,
      unit: "بازدید",
      percent: summary?.monthGrowthPercent ?? 0,
      comparePeriod: "month" as const,
    },
    {
      id: "today",
      title: "بلاگ‌های امروز",
      value: summary?.blogsToday ?? 0,
      valueType: "custom" as const,
      unit: "بلاگ",
      percent: summary?.monthGrowthPercent ?? 0,
      comparePeriod: "day" as const,
    },
  ];

  // ========== داده‌های RadialChart (وضعیت بلاگ‌ها) ==========
  // ✅ هر ۴ وضعیت به‌جای فقط published/draft
  const radialData = useMemo(() => {
    const draft = summary?.draftBlogs ?? 0;
    const published = summary?.publishedBlogs ?? 0;
    const scheduled = summary?.scheduledBlogs ?? 0;
    const unpublished = summary?.unpublishedBlogs ?? 0;
    const total = draft + published + scheduled + unpublished || 1;

    const counts: Record<BlogStatusKey, number> = {
      draft,
      published,
      scheduled,
      unpublished,
    };

    return BLOG_STATUS_KEYS.map((key) => ({
      key,
      label: BLOG_STATUS_LABELS[key],
      value: Math.round((counts[key] / total) * 100),
      unitsSold: counts[key],
      color: BLOG_STATUS_COLORS[key],
    }));
  }, [summary]);

  // ========== داده‌های LineChart (روند انتشار وبلاگ‌ها) ==========
  const lineChartData = useMemo(() => {
    if (selectedMonth && monthlyChart) {
      return monthlyChart.countByDay;
    }
    return charts?.blogsLast30Days
      ? mapRowsToJalaliDays(charts.blogsLast30Days)
      : [];
  }, [selectedMonth, monthlyChart, charts]);

  const daysInMonth = selectedMonth && monthlyChart ? monthlyChart.daysInMonth : undefined;

  // ========== داده‌های BarChart (پربازدیدترین وبلاگ‌ها) ==========
  const barData = useMemo(() => {
    if (!charts?.topViewedChart) return [];
    return charts.topViewedChart.slice(0, 7).map((item) => ({
      day: item.name.length > 12 ? item.name.slice(0, 12) + "..." : item.name,
      value: item.views,
    }));
  }, [charts]);

  // ========== داده‌های RankingCard ==========
 // ========== داده‌های RankingCard (پرلایک‌ترین) ==========
const rankingItems = useMemo(() => {
  if (!report?.topLikedBlogs) return [];
  return report.topLikedBlogs.map((blog) => ({
    id: blog.id,
    name: blog.title,
    count: blog.likes ?? 0,
    image: blog.image || "/images/blog-placeholder.png",
    href: `/dashboard/blogs/${blog.slug}`, // ✅ اضافه شد
  }));
}, [report]);
  // ========== داده‌های ListCard (نویسندگان برتر) ==========
const listItems = useMemo(() => {
  if (!report?.topAuthors) return [];
  return report.topAuthors.map((author) => ({
    id: author.id,
    name: author.name ?? `کاربر ${author.id}`,
    count: author._count.blogs,
    image: getAvatarSrc(author.image_id), // نیاز به import همون getAvatarSrc از صفحه‌ی کامنت‌ها
  }));
}, [report]);

  // ========== داده‌های CustomTable (جدیدترین وبلاگ‌ها) ==========
  const newestBlogsRows: NewestBlogRow[] = useMemo(() => {
    if (!report?.newestBlogs) return [];
    return report.newestBlogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      status: String(blog.status),
      created_at: blog.created_at ?? "",
      views: blog.view ?? 0,
      likes: blog.likes ?? 0,
      comments: blog.comments ?? 0,
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

      {/* ===== ردیف دوم: RadialChart + LineChart (دو ستونه) ===== */}
      <div className="mt-10 flex items-stretch gap-10">
        <div className="flex w-[40%]">
          <RadialChart
            icon={<BookIcon size="sm" color="text-secondary" />}
            title="وضعیت بلاگ‌ها"
            periodLabel="کل بلاگ‌ها"
            data={radialData}
            centerValue={summary?.totalBlogs ?? 0}
            centerUnit="بلاگ"
          />
        </div>

        <div className="flex w-[60%]">
          <LineChart
            title="روند انتشار وبلاگ‌ها"
            subtitle="ماهانه"
            icon={<ReportIcon size="sm" color="text-secondary" />}
            data={lineChartData}
            daysInMonth={daysInMonth}
            valueSuffix="بلاگ"
            axisTitle="تعداد"
            metricLabel="وبلاگ‌ها"
            monthName={selectedMonth ?? undefined}
            onMonthChange={(month) => setSelectedMonth(month)}
          />
        </div>
      </div>

      {/* ===== ردیف سوم: BarChart (پربازدیدترین) + RankingCard (پربازدیدترین) ===== */}
      <div className="mt-10 flex items-stretch gap-10">
        <div className="flex w-[50%]">
         <BarChart
  title="پربازدیدترین وبلاگ‌ها"
  subtitle="بر اساس تعداد بازدید"
  icon={<EyeIcon size="sm" color="text-secondary" />}
  data={barData}
  valueSuffix="بازدید" // ✅
/>
        </div>

        <div className="flex w-[50%]">
        <RankingCard
  icon={<LikeIcon size="sm" color="text-secondary" />}
  title="محبوب ترین وبلاگ‌ها" // ✅ به‌جای «پربازدیدترین»
  periodLabel="کل بازه"
  unit="لایک" // ✅ به‌جای «بازدید»
  items={rankingItems}
  itemsPerPage={3}
/>
        </div>
      </div>

      {/* ===== ردیف چهارم: ListCard (نویسندگان برتر) + CustomTable (جدیدترین بلاگ‌ها) ===== */}
      <div className="mt-10 flex items-stretch gap-10">
        <div className="flex w-[30%]">
          <ListCard
            icon={<UserIcon size="sm" color="text-secondary" />}
            title="نویسندگان برتر"
            unit="بلاگ"
            items={listItems}
            onButtonClick={() => router.push("/dashboard/users/list")}
          />
        </div>

        <div className="flex w-[70%]">
          <CustomTable
            title="جدیدترین وبلاگ‌ها"
            titleIcon={<PencilIcon size="sm" color="text-secondary" />}
            columns={NEWEST_BLOGS_COLUMNS}
            rows={newestBlogsRows}
            onViewAll={() => router.push("/dashboard/blogs/list")}
            showViewAll
            viewAllLabel="مشاهده همه"
            emptyText="هیچ وبلاگی یافت نشد"
          />
        </div>
      </div>
    </>
  );
}