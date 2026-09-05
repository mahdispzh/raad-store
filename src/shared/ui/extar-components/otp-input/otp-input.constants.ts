// _constants/otp-select-_constants.ts
// استایل‌های border بر اساس status
export const getBorderStyles = (
  status: "default" | "success" | "error",
): string => {
  switch (status) {
    case "success":
      return "border-[var(--color-success)]";
    case "error":
      return "border-[var(--color-danger)]";
    default:
      return "border-[var(--color-gray)]";
  }
};

// استایل‌های text بر اساس status
export const getTextStyles = (
  status: "default" | "success" | "error",
): string => {
  switch (status) {
    case "success":
      return "text-[var(--color-success)]";
    case "error":
      return "text-[var(--color-danger)]";
    default:
      return "text-[var(--color-primary)]";
  }
};

// استایل پس‌زمینه بر اساس disabled
export const getBgStyles = (disabled: boolean): string => {
  return disabled ? "bg-[var(--color-accent)]" : "bg-[var(--color-white)]";
};
