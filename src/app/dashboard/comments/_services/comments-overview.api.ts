// src/app/dashboard/comments/_services/comments-overview.api.ts

import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export type CommentsOverviewResponse = {
  summary: {
    totalComments: number;
    approvedComments: number;
    pendingComments: number;
    rejectedComments: number;
    anonymousComments: number;
    todayComments: number;
    thisMonthComments: number;
    productWithComments: number;
    usersWithComments: number;
  };
  report: {
    latestComments: {
      id: number;
      text: string;
      status: number;
      created_at: string;
      users: { id: number; name: string | null; phone: string | null } | null;
      products: { id: number; name: string } | null;
    }[];
    mostCommentedProducts: {
      id: number;
      name: string;
      slug: string;
      images?: string[] | null;
      _count: { comments: number };
    }[];
    topCommentUsers: {
      id: number;
      name: string | null;
      phone: string | null;
      image_id: number;
      _count: { comments: number };
    }[];
  };
  charts: {
    commentsLast30Days: { date: string; count: number }[];
    monthlyComments: { month: string; count: number }[];
  };
};

export const getCommentsOverview = () => {
  return fetcher<CommentsOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/comments"),
  );
};

export type CommentsMonthlyChartResponse = {
  countByDay: { day: number; value: number }[];
  daysInMonth: number;
};

/**
 * دیتای روزانه‌ی یک ماه جلالی خاص برای LineChart.
 * month می‌تونه اسم فارسی ماه ("مرداد") یا عدد ۱ تا ۱۲ باشه.
 */
export const getCommentsMonthlyChart = (
  month: string | number,
  year?: number,
) => {
  return fetcher<CommentsMonthlyChartResponse>(() =>
    apiClient.get("/protected/admin-overview/comments/monthly", {
      params: year ? { month, year } : { month },
    }),
  );
};