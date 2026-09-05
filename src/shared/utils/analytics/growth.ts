/**
 * درصد رشد نسبت به دوره‌ی قبل.
 * اگه دوره‌ی قبل صفر بوده و الان مقداری داریم، ۱۰۰٪ رشد در نظر گرفته می‌شه.
 */
export function calculateGrowth(current: number, previous: number): number {
  if (previous > 0) {
    return Number((((current - previous) / previous) * 100).toFixed(1));
  }
  return current > 0 ? 100 : 0;
}

export type PeriodComparison = {
  current: number;
  previous: number;
  growth: number;
};

/** مقایسه‌ی دو مقدار (دوره‌ی جاری و قبلی) + محاسبه‌ی خودکار درصد رشد */
export function comparePeriods(current: number, previous: number): PeriodComparison {
  return { current, previous, growth: calculateGrowth(current, previous) };
}
