// src/shared/utils/formatCartCount.ts

/**
 * تعداد اقلام سبد خرید را به صورت فرمت شده نمایش می‌دهد.
 * اگر تعداد بیشتر از ۹ باشد، "۹+" نمایش داده می‌شود.
 * @param count - تعداد اقلام سبد خرید
 * @returns رشته فرمت شده
 *
 * @example
 * formatCartCount(0) // "0"
 * formatCartCount(5) // "5"
 * formatCartCount(9) // "9"
 * formatCartCount(10) // "9+"
 * formatCartCount(15) // "9+"
 */
export const formatCartCount = (count: number): string => {
  if (count > 9) {
    return "۹+";
  }
  return String(count);
};
