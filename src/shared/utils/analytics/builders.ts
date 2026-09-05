import { PERSIAN_WEEK_DAYS, HOUR_BUCKETS, formatHourLabel } from "./constants";

type WeekdayRow = { dow: number; value: number };
type HourRow = { hour: number; value: number };

/** ردیف‌های خام (dow, value) رو به آرایه‌ی مرتب شنبه..جمعه برای نمودار تبدیل می‌کنه */
export function buildWeekdayChart(rows: WeekdayRow[]) {
  return PERSIAN_WEEK_DAYS.map(({ dow, day }) => ({
    day,
    value: rows.find((r) => r.dow === dow)?.value ?? 0,
  }));
}

/** ردیف‌های خام (hour, value) رو به بازه‌های ۴ ساعته برای نمودار تبدیل می‌کنه */
export function buildHourlyChart(rows: HourRow[]) {
  return HOUR_BUCKETS.map(({ start, end }) => ({
    day: `${formatHourLabel(start)} - ${formatHourLabel(end)}`,
    value: rows
      .filter((r) => r.hour >= start && r.hour < end)
      .reduce((sum, r) => sum + r.value, 0),
  }));
}

export function sumValues(rows: { value: number }[]): number {
  return rows.reduce((sum, r) => sum + r.value, 0);
}
