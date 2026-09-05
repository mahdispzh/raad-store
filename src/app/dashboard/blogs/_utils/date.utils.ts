/**
 * تبدیل تاریخ به فرمت خوانا به فارسی
 * @param dateStr - تاریخ به صورت رشته (مثلاً "2026-07-13T01:38:00.000Z")
 * @returns تاریخ فرمت شده به فارسی (مثلاً "۱۳ تیر ۱۴۰۵، ۰۵:۰۸")
 */
export const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    // اگر تاریخ نامعتبر باشد
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
};

/**
 * تبدیل تاریخ فقط به تاریخ (بدون ساعت)
 */
export const formatDateOnly = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "-";
  }
};

/**
 * تبدیل تاریخ به زمان (فقط ساعت و دقیقه)
 */
export const formatTimeOnly = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
};
