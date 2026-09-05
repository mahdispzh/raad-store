// src/app/api/protected/admin-overview/orders/monthly/_lib/monthly.ts
import { prisma } from "@/prisma/prisma";
import {
  jalaliMonthRangeFor,
  daysInJalaliMonth,
  toJalaliDayOfMonth,
} from "@/src/shared/utils/analytics";

export async function getOrdersMonthlyChartData(jy: number, jm: number) {
  const { start, end } = jalaliMonthRangeFor(jy, jm);
  const daysInMonth = daysInJalaliMonth(jy, jm);

  // ✅ همراه با count، مجموع مبلغ سفارش‌های موفق (payment_status=1) هم می‌گیریم
  // تا بدون کوئری/فایل جدا، هم تعداد هم درآمد روزانه در دسترس باشه
  const rows = await prisma.$queryRaw<
    { date: string; count: number; revenue: number }[]
  >`
    SELECT
      DATE(created_at) AS date,
      COUNT(*)::int AS count,
      SUM(CASE WHEN payment_status = 1 THEN total_price ELSE 0 END)::int AS revenue
    FROM orders
    WHERE created_at >= ${start} AND created_at < ${end}
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at);
  `;

  const countMap = new Map<number, number>();
  const revenueMap = new Map<number, number>();
  for (const row of rows) {
    const day = toJalaliDayOfMonth(new Date(row.date));
    countMap.set(day, row.count);
    revenueMap.set(day, row.revenue);
  }

  const countByDay = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    value: countMap.get(i + 1) ?? 0,
  }));

  // ✅ جدید — برای LineChart «آمار فروش ماهانه»
  const revenueByDay = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    revenue: revenueMap.get(i + 1) ?? 0,
  }));

  return {
    countByDay,
    revenueByDay,
    daysInMonth,
    jalaaliYear: jy,
    jalaaliMonth: jm,
  };
}