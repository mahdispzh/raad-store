import { prisma } from "@/prisma/prisma";

/**
 * دریافت داده‌های نمودارهای داشبورد کامنت‌ها
 *
 * خروجی:
 * - commentsLast30Days: تعداد کامنت‌های ثبت شده در ۳۰ روز اخیر
 * - monthlyComments: تعداد کامنت‌های ثبت شده به تفکیک ۱۲ ماه اخیر
 * - commentStatusChart: نسبت کامنت‌های تایید شده، در انتظار و رد شده
 * - anonymousChart: نسبت کامنت‌های ناشناس و ثبت شده توسط کاربران
 * - topProductsChart: ۱۰ محصول با بیشترین تعداد کامنت
 * - topUsersChart: ۱۰ کاربر با بیشترین تعداد کامنت
 */
export async function getCommentsCharts(
  summary: {
    totalComments: number;
    approvedComments: number;
    pendingComments: number;
    rejectedComments: number;
    anonymousComments: number;
  },
  report: {
    mostCommentedProducts: {
      name: string;
      _count: {
        comments: number;
      };
    }[];

    topCommentUsers: {
      id: number;
      name: string | null;
      phone: string | null;
      _count: {
        comments: number;
      };
    }[];
  },
) {
  const [commentsLast30Days, monthlyComments] = await Promise.all([
    prisma.$queryRaw<
      {
        date: string;
        count: number;
      }[]
    >`
      SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS count
      FROM comments
      WHERE created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

    prisma.$queryRaw<
      {
        month: string;
        count: number;
      }[]
    >`
      SELECT
        TO_CHAR(created_at,'YYYY-MM') AS month,
        COUNT(*)::int AS count
      FROM comments
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `,
  ]);

  return {
    commentsLast30Days,

    monthlyComments,

    commentStatusChart: [
      {
        name: "تایید شده",
        value: summary.approvedComments,
      },
      {
        name: "در انتظار",
        value: summary.pendingComments,
      },
      {
        name: "رد شده",
        value: summary.rejectedComments,
      },
    ],

    anonymousChart: [
      {
        name: "ناشناس",
        value: summary.anonymousComments,
      },
      {
        name: "کاربران",
        value: summary.totalComments - summary.anonymousComments,
      },
    ],

    topProductsChart: report.mostCommentedProducts.map((product) => ({
      name: product.name,
      comments: product._count.comments,
    })),

    topUsersChart: report.topCommentUsers.map((user) => ({
      name: user.name ?? user.phone ?? `User ${user.id}`,
      comments: user._count.comments,
    })),
  };
}
