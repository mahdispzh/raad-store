"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toJalaali } from "jalaali-js";

import { CustomTable } from "@/src/shared/components/custom-table/custom-table.ui";
import { TableColumn } from "@/src/shared/components/custom-table/table.types";
import { LineChart } from "@/src/shared/components/line-chart/line-chart.ui";
import { ListCard } from "@/src/shared/components/list-card/list-card.ui";
import { RankingCard } from "@/src/shared/components/ranking-card/ranking-card.ui";
import { SummaryCard } from "@/src/shared/components/summary-card/summary-card.ui";
import {
  BoxIcon,
  CalendarIcon,
  CheckIcon,
  CircularCommentIcon,
  ClockIcon,
  CloseIcon,
  CommentIcon,
  FactorIcon,
  InventoryIcon,
  ReportIcon,
  UserIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { useCommentsOverview } from "../../_hooks/useCommentsOverview";
import { mapRowsToJalaliDays, PERSIAN_MONTHS } from "@/src/shared/utils/analytics";
import { useCommentsMonthlyChart } from "../../_hooks/useCommentsMonthlyChart";
import { CommentStatusBadge } from "@/src/shared/ui/comment-status-badge/comment-status-badge.ui";
import type { CommentStatus } from "@/src/shared/ui/comment-status-badge/comment-status-badge.types";
import { AVATAR_OPTIONS, DEFAULT_AVATAR } from "../../../profile/_constants/avatars";

type CommentsOverviewLatestRow = {
  id: number;
  text: string;
  status: number;
  created_at: string;
  userName: string;
  productName: string;
};

const LATEST_COMMENTS_COLUMNS: TableColumn<CommentsOverviewLatestRow>[] = [
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
    key: "userName",
    header: "کاربر",
    align: "center",
    render: (row) => (
      <Text text={row.userName} size="sm" color="secondary" align="center" />
    ),
  },
  {
    key: "productName",
    header: "محصول",
    align: "center",
    render: (row) => (
      <Text text={row.productName} size="sm" color="secondary" align="center" />
    ),
  },
  {
    key: "text",
    header: "متن کامنت",
    align: "center",
    render: (row) => (
      <div className="max-w-[220px] truncate">
        <Text text={row.text} size="sm" color="secondary" align="center" />
      </div>
    ),
  },
  {
    key: "status",
    header: "وضعیت",
    align: "center",
    render: (row) => <CommentStatusBadge status={row.status as CommentStatus} />,
  },
  {
    key: "date",
    header: "تاریخ",
    align: "center",
    render: (row) => (
      <Text
        text={new Date(row.created_at).toLocaleDateString("fa-IR")}
        size="sm"
        color="secondary"
        align="center"
      />
    ),
  },
];

// image_id روی users مقدار ایندکس آواتار انتخابی کاربره؛ اگر با هیچ گزینه‌ای
// مچ نشد (یا 0 بود) آواتار پیش‌فرض ادمین نشون داده می‌شه.
function getAvatarSrc(imageId: number): string {
  return (
    AVATAR_OPTIONS.find((avatar) => avatar.id === imageId)?.src ??
    DEFAULT_AVATAR
  );
}

export default function CommentsOverviewPage() {
  const router = useRouter();
  const { data } = useCommentsOverview();

  // دریافت ماه جاری شمسی به‌عنوان پیش‌فرض (با fallback)
  const currentJalaliMonth = PERSIAN_MONTHS[toJalaali(new Date()).jm - 1] ?? "فروردین";
  const [selectedMonth, setSelectedMonth] = useState<string | null>(currentJalaliMonth);

  // همیشه ماه جاری یا انتخاب‌شده را فچ می‌کنیم
  const { data: monthlyChart } = useCommentsMonthlyChart(selectedMonth);

  const summary = data?.summary;
  const report = data?.report;
  const charts = data?.charts;

  const summaryItems = [
    {
      id: "total",
      value: summary?.totalComments ?? 0,
      label: "کل کامنت‌ها",
      icon: <CommentIcon size="xs" color="text-secondary" />,
    },
    {
      id: "pending",
      value: summary?.pendingComments ?? 0,
      label: "در انتظار تأیید",
      icon: <ClockIcon size="xs" color="text-secondary" />,
    },
    {
      id: "approved",
      value: summary?.approvedComments ?? 0,
      label: "تأیید شده",
      icon: <CheckIcon size="xs" color="text-secondary" />,
    },
    {
      id: "rejected",
      value: summary?.rejectedComments ?? 0,
      label: "رد شده",
      icon: <CloseIcon size="xs" color="text-secondary" />,
    },
    {
      id: "today",
      value: summary?.todayComments ?? 0,
      label: "کامنت های امروز",
      icon: <InventoryIcon size="xs" color="text-secondary" />,
    },
    {
      id: "thisMonth",
      value: summary?.thisMonthComments ?? 0,
      label: "کامنت های این ماه",
      icon: <CalendarIcon size="xs" color="text-secondary" />,
    },
  ];

const rankingItems =
  report?.mostCommentedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    count: p._count.comments,
    image: p.images?.[0] ?? "",
    href: `/products/${p.slug}`,
  })) ?? [];

  const listItems =
    report?.topCommentUsers.map((u) => ({
      id: u.id,
      name: u.name  ?? `کاربر ${u.id}`,
      count: u._count.comments,
      image: getAvatarSrc(u.image_id),
      imageId: u.image_id,
    })) ?? [];

  // داده‌های خط چارت: اگر monthlyChart وجود داشته باشد از آن استفاده کن،
  // در غیر این‌صورت از داده‌های ۳۰ روز اخیر (فقط برای حالت‌های نادر که monthlyChart نیامده) استفاده شود.
  const lineChartData = useMemo(() => {
    if (monthlyChart) {
      return monthlyChart.countByDay;
    }
    return charts?.commentsLast30Days
      ? mapRowsToJalaliDays(charts.commentsLast30Days)
      : [];
  }, [monthlyChart, charts]);

  const daysInMonth = monthlyChart?.daysInMonth;

  const latestCommentsRows: CommentsOverviewLatestRow[] =
    report?.latestComments.map((c) => ({
      id: c.id,
      text: c.text,
      status: c.status,
      created_at: c.created_at,
      userName: c.users?.name ?? c.users?.phone ?? "ناشناس",
      productName: c.products?.name ?? "-",
    })) ?? [];

  return (
    <>
      <div className="flex gap-10">
        <SummaryCard
          title="وضعیت کامنت‌ها"
          titleIcon={<CircularCommentIcon size="sm" color="text-secondary" />}
          items={summaryItems}
        />
      </div>

      <div className="flex items-stretch gap-10">
        <div className="flex w-[45%]">
          <LineChart
            title="روند ثبت کامنت‌ها"
            subtitle="ماهانه"
            icon={<ReportIcon size="sm" color="text-secondary" />}
            data={lineChartData}
            daysInMonth={daysInMonth}
            valueSuffix="عدد"
            axisTitle="تعداد"
            metricLabel="کامنت‌ها"
            monthName={selectedMonth ?? undefined}
            onMonthChange={(month) => setSelectedMonth(month)}
          />
        </div>

        <div className="flex w-[55%]">
          <CustomTable
            title="آخرین کامنت‌ها"
            titleIcon={<FactorIcon size="sm" color="text-secondary" />}
            columns={LATEST_COMMENTS_COLUMNS}
            rows={latestCommentsRows}
            onViewAll={() => router.push("/dashboard/comments/list")}
          />
        </div>
      </div>

      <div className="flex items-stretch gap-10">
        <div className="flex w-[70%]">
          <RankingCard
            icon={<BoxIcon size="sm" color="text-secondary" />}
            title="محصولات با بیشترین کامنت"
            periodLabel="کل بازه"
            unit="کامنت"
            items={rankingItems}
            itemsPerPage={5}
          />
        </div>

        <div className="flex w-[30%]">
          <ListCard
            icon={<UserIcon size="sm" color="text-secondary" />}
            title="کاربران با بیشترین کامنت"
            unit="کامنت"
            items={listItems}
            onButtonClick={() => router.push("/dashboard/comments/list")}
          />
        </div>
      </div>
    </>
  );
}