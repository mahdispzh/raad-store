// _constants/price._constants.ts

import { SizeType } from "./price.types";

// نگاشت سایز به کلاس متن
export const sizeToTextClass: Record<SizeType, string> = {
  xs: "text-xs",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

// دریافت سایز آیکون اصلی بر اساس سایز کامپوننت
export const getMainIconSize = (size: SizeType): "sm" | "md" => {
  return size === "xs" || size === "md" ? "sm" : "md";
};

// دریافت کلاس متن خط خورده بر اساس سایز کامپوننت
export const getStrikethroughTextClass = (mainSize: SizeType): string => {
  switch (mainSize) {
    case "xs":
      return "text-2xs";
    case "md":
      return "text-xs";
    case "lg":
      return "text-sm";
    case "xl":
      return "text-sm";
    case "2xl":
      return "text-base";
    default:
      return "text-xs";
  }
};

// دریافت سایز آیکون خط خورده بر اساس سایز کامپوننت
export const getStrikethroughIconSize = (mainSize: SizeType): "xs" | "sm" => {
  const mainIcon = getMainIconSize(mainSize);
  return mainIcon === "sm" ? "xs" : "sm";
};
