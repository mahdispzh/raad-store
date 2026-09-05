/**
 * نگاشت DOW پستگرس (EXTRACT(DOW ...) → 0=یکشنبه ... 6=شنبه)
 * به ترتیب هفته‌ی ایرانی: شنبه تا جمعه
 */
export const PERSIAN_WEEK_DAYS = [
  { dow: 6, day: "شنبه" },
  { dow: 0, day: "یکشنبه" },
  { dow: 1, day: "دوشنبه" },
  { dow: 2, day: "سه‌شنبه" },
  { dow: 3, day: "چهارشنبه" },
  { dow: 4, day: "پنجشنبه" },
  { dow: 5, day: "جمعه" },
] as const;

/** بازه‌های ۴ ساعته برای گزارش روزانه (۰۰-۰۴, ۰۴-۰۸, ...) */
export const HOUR_BUCKETS = [
  { start: 0, end: 4 },
  { start: 4, end: 8 },
  { start: 8, end: 12 },
  { start: 12, end: 16 },
  { start: 16, end: 20 },
  { start: 20, end: 24 },
] as const;

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;

export function toPersianDigits(value: string): string {
  return value.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]!);
}
export function formatHourLabel(hour: number): string {
  return toPersianDigits(hour.toString().padStart(2, "0")) + ":۰۰";
}
