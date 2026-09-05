/**
 * تبدیل و محاسبات تقویم جلالی (شمسی)
 *
 * از پکیج jalaali-js استفاده شده چون قوانین کبیسه‌ی تقویم جلالی
 * (چرخه‌ی ۳۳ ساله) پیچیده و مستعد باگ هست؛ به‌جای پیاده‌سازی دستی،
 * از یه پکیج سبک و بدون وابستگی و تست‌شده استفاده می‌کنیم.
 *
 * نصب: npm install jalaali-js
 */
import * as jalaali from "jalaali-js";
export type DateRange = { start: Date; end: Date };

/** اول یه ماه جلالی مشخص رو به Date گریگوری (میلادی) تبدیل می‌کنه */
function jalaliMonthStartToGregorian(jy: number, jm: number): Date {
  const g = jalaali.toGregorian(jy, jm, 1);
  return new Date(g.gy, g.gm - 1, g.gd);
}

/** ماه/سال جلالی رو نرمال می‌کنه (مثلا ماه ۱۳ یعنی فروردین سال بعد) */
function normalizeJalaliMonth(jy: number, jm: number): { jy: number; jm: number } {
  let y = jy;
  let m = jm;
  while (m < 1) {
    m += 12;
    y -= 1;
  }
  while (m > 12) {
    m -= 12;
    y += 1;
  }
  return { jy: y, jm: m };
}

/**
 * بازه‌ی زمانی یک ماه جلالی، بر اساس تعداد ماه‌های عقب‌تر از ماه جاری.
 * monthsAgo=0 یعنی ماه جاری، monthsAgo=1 یعنی ماه قبل و ...
 * طول ماه (۲۹/۳۰/۳۱) و سال کبیسه به‌صورت خودکار توسط jalaali-js لحاظ می‌شه.
 */
export function jalaliMonthRange(monthsAgo = 0): DateRange {
  const now = new Date();
  const { jy, jm } = jalaali.toJalaali(now);

  const target = normalizeJalaliMonth(jy, jm - monthsAgo);
  const next = normalizeJalaliMonth(target.jy, target.jm + 1);

  return {
    start: jalaliMonthStartToGregorian(target.jy, target.jm),
    end: jalaliMonthStartToGregorian(next.jy, next.jm),
  };
}

/** بازه‌ی زمانی یک سال جلالی (yearsAgo=0 یعنی سال جاری) */
export function jalaliYearRange(yearsAgo = 0): DateRange {
  const now = new Date();
  const { jy } = jalaali.toJalaali(now);
  const targetJy = jy - yearsAgo;

  return {
    start: jalaliMonthStartToGregorian(targetJy, 1),
    end: jalaliMonthStartToGregorian(targetJy + 1, 1),
  };
}

/** لیست بازه‌های ماهانه‌ی جلالی برای n ماه اخیر، از قدیم به جدید */
export function lastNJalaliMonths(n: number): DateRange[] {
  return Array.from({ length: n }, (_, i) => jalaliMonthRange(n - 1 - i));
}

/** برچسب «سال/ماه» جلالی برای یک بازه (برای لیبل نمودار) */
export function jalaliMonthLabel(range: DateRange): string {
  const { jy, jm } = jalaali.toJalaali(range.start);
  return `${jy}/${String(jm).padStart(2, "0")}`;
}
export const PERSIAN_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
] as const;

/** سال شمسی جاری */
export function getCurrentJalaliYear(): number {
  const { jy } = jalaali.toJalaali(new Date());
  return jy;
}

/** اسم ماه فارسی رو به شماره‌ی ماه شمسی (۱ تا ۱۲) تبدیل می‌کنه */
export function getJalaliMonthNumber(monthName: string): number | null {
  const index = PERSIAN_MONTHS.indexOf(monthName as (typeof PERSIAN_MONTHS)[number]);
  return index === -1 ? null : index + 1;
}

/** طول واقعی ماه شمسی (۲۹/۳۰/۳۱) بر اساس اسم ماه */
export function getDaysInJalaliMonth(monthName: string, jalaliYear?: number): number {
  const monthNumber = getJalaliMonthNumber(monthName);
  if (monthNumber === null) return 30; // fallback

  const jy = jalaliYear ?? getCurrentJalaliYear();
  return jalaali.jalaaliMonthLength(jy, monthNumber);
}
/** بازه‌ی یک ماه جلالیِ مشخص (بر خلاف jalaliMonthRange که نسبت به ماه جاریه) */
export function jalaliMonthRangeFor(jy: number, jm: number): DateRange {
  const { jy: normJy, jm: normJm } = normalizeJalaliMonth(jy, jm);
  const next = normalizeJalaliMonth(normJy, normJm + 1);

  return {
    start: jalaliMonthStartToGregorian(normJy, normJm),
    end: jalaliMonthStartToGregorian(next.jy, next.jm),
  };
}

/** طول ماه جلالی بر اساس شماره‌ی ماه (نسخه‌ی عددیِ getDaysInJalaliMonth) */
export function daysInJalaliMonth(jy: number, jm: number): number {
  return jalaali.jalaaliMonthLength(jy, jm);
}

/** روز-از-ماهِ جلالیِ یک تاریخ گریگوری (برای نگاشت نتیجه‌ی SQL به محور X نمودار) */
export function toJalaliDayOfMonth(date: Date): number {
  return jalaali.toJalaali(date).jd;
}