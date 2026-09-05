import type { DateRange } from "./jalali";

const DAY_MS = 24 * 60 * 60 * 1000;

/** شروع امروز (ساعت ۰۰:۰۰:۰۰) */
export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** n روز قبل از شروع امروز */
export function daysAgo(n: number): Date {
  return new Date(startOfToday().getTime() - n * DAY_MS);
}

/** بازه‌ی «امروز»، یا offsetDays روز قبل (offsetDays=1 یعنی دیروز) */
export function dayRange(offsetDays = 0): DateRange {
  return { start: daysAgo(offsetDays), end: daysAgo(offsetDays - 1) };
}

/**
 * بازه‌ی ۷ روز غلتان (rolling)، نه هفته‌ی تقویمی.
 * weeksAgo=0 یعنی ۷ روز اخیر، weeksAgo=1 یعنی ۷ روز قبل از اون.
 */
export function weekRange(weeksAgo = 0): DateRange {
  return {
    start: daysAgo((weeksAgo + 1) * 7 - 1),
    end: daysAgo(weeksAgo * 7 - 1),
  };
}