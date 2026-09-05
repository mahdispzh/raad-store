import { toJalaliDayOfMonth } from "./jalali";

type DailyCountRow = { date: string | Date; count: number };

/**
 * ردیف‌های GROUP BY DATE(created_at) رو به {day جلالی, value} تبدیل می‌کنه
 * — ورودی LineChart دقیقاً همین شکل رو می‌خواد.
 */
export function mapRowsToJalaliDays(
  rows: DailyCountRow[],
  daysInMonth?: number,
): { day: number; value: number }[] {
  const map = new Map<number, number>();
  for (const row of rows) {
    map.set(toJalaliDayOfMonth(new Date(row.date)), row.count);
  }
  if (!daysInMonth) {
    // حالت فعلی برای بک‌وارد کامپتیبیلیتی (مثلاً commentsLast30Days که ماه کامل نیست)
    return rows.map((row) => ({
      day: toJalaliDayOfMonth(new Date(row.date)),
      value: row.count,
    }));
  }
  return Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    value: map.get(i + 1) ?? 0,
  }));
}