import { prisma } from "@/prisma/prisma";
import type { getUserReport } from "./report";
import type { getUserSummary } from "./summary";
type UserSummary = Awaited<ReturnType<typeof getUserSummary>>;
type UserReport = Awaited<ReturnType<typeof getUserReport>>;

export async function getUserCharts(summary: UserSummary, report: UserReport) {
  const [usersLast30Days, registrationsByMonth] = await Promise.all([
    prisma.$queryRaw<
      {
        date: string;
        count: number;
      }[]
    >`
      SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS count
      FROM users
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
      FROM users
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `,
  ]);

  return {
    usersLast30Days,

    registrationsByMonth,

    roleDistribution: [
      {
        name: "مشتری",
        value: summary.totalCustomers,
      },
      {
        name: "ادمین",
        value: summary.totalAdmins,
      },
    ],

    usersOrderDistribution: [
      {
        name: "دارای سفارش",
        value: summary.usersWithOrders,
      },
      {
        name: "بدون سفارش",
        value: summary.usersWithoutOrdersCount,
      },
    ],

    usersAddressDistribution: [
      {
        name: "دارای آدرس",
        value: summary.usersWithAddress,
      },
      {
        name: "بدون آدرس",
        value: summary.usersWithoutAddressCount,
      },
    ],

    recentlyViewedChart: [
      {
        name: "دارای تاریخچه بازدید",
        value: summary.usersWithRecentlyViewed,
      },
      {
        name: "بدون تاریخچه بازدید",
        value: summary.totalUsers - summary.usersWithRecentlyViewed,
      },
    ],

    recentlySearchChart: [
      {
        name: "دارای تاریخچه جستجو",
        value: summary.usersWithRecentlySearch,
      },
      {
        name: "بدون تاریخچه جستجو",
        value: summary.totalUsers - summary.usersWithRecentlySearch,
      },
    ],

    topCustomersChart: report.topCustomers.map((user) => ({
      name: user.name ?? user.phone ?? `User ${user.id}`,
      orders: user._count.orders,
    })),
  };
}
/**
 * خروجی نمودارهای کاربران
 *
 * usersLast30Days
 * تعداد کاربران ثبت‌نام شده در ۳۰ روز اخیر
 *
 * registrationsByMonth
 * تعداد ثبت‌نام کاربران به تفکیک ماه
 *
 * roleDistribution
 * توزیع کاربران بر اساس نقش (مشتری / ادمین)
 *
 * usersOrderDistribution
 * تعداد کاربران دارای سفارش و بدون سفارش
 *
 * usersAddressDistribution
 * تعداد کاربران دارای آدرس و بدون آدرس
 *
 * recentlyViewedChart
 * تعداد کاربران دارای تاریخچه بازدید و بدون تاریخچه بازدید
 *
 * recentlySearchChart
 * تعداد کاربران دارای تاریخچه جستجو و بدون تاریخچه جستجو
 *
 * topCustomersChart
 * ۱۰ کاربری که بیشترین سفارش را ثبت کرده‌اند
 */
