export const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

// درصدی از عرض/ارتفاع کانتینر (نه پیکسل ثابت) تا با تغییر سایز کانتینر خودش رو تنظیم کنه
export const PIE_CHART_OUTER_RADIUS = "80%";
export const PIE_CHART_LABEL_OFFSET = 25;
export const PIE_CHART_LABEL_LINE_OFFSET = 14;

// اگه سهم یک اسلایس از این کمتر باشه، لیبل درصدش نشون داده نمیشه
// (برای جلوگیری از رو هم افتادن لیبل‌های اسلایس‌های خیلی کوچیک)
export const PIE_CHART_MIN_LABEL_PERCENT = 0.01;

export const DEFAULT_PIE_CHART_UNIT = "سفارش";

// ترتیب پیش‌فرض رنگ‌ها وقتی آیتم‌ها رنگ خودشون رو مشخص نکرده باشن
export const DEFAULT_PIE_CHART_COLORS = [
  "var(--color-secondary)",
  "var(--color-primary)",
  "#5A4D4B",
  "#7C6868",
];