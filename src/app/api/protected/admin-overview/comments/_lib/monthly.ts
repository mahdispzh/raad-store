// src/app/api/protected/admin-overview/comments/monthly/_lib/monthly.ts
import { prisma } from "@/prisma/prisma";
import { jalaliMonthRangeFor, daysInJalaliMonth } from "@/src/shared/utils/analytics";
import { toJalaliDayOfMonth } from "@/src/shared/utils/analytics";

export async function getCommentsMonthlyChartData(jy: number, jm: number) {
  const { start, end } = jalaliMonthRangeFor(jy, jm);
  const daysInMonth = daysInJalaliMonth(jy, jm);

  const rows = await prisma.$queryRaw<{ date: string; count: number }[]>`
    SELECT DATE(created_at) AS date, COUNT(*)::int AS count
    FROM comments
    WHERE created_at >= ${start} AND created_at < ${end}
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at);
  `;

  // نگاشت رکوردهای واقعی به روز جلالی
  const countMap = new Map<number, number>();
  for (const row of rows) {
    const day = toJalaliDayOfMonth(new Date(row.date));
    countMap.set(day, row.count);
  }

  // ⚠️ پر کردن روزهای بدون کامنت با صفر — این قسمت توی یوتیلزت نیست!
  const countByDay = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    value: countMap.get(i + 1) ?? 0,
  }));

  return { countByDay, daysInMonth };
}