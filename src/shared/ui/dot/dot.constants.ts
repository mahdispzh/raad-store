import { DotColor, DotSize } from "./dot.types";

export const sizeClasses: Record<DotSize, string> = {
  sm: "w-[6px] h-[6px]",

  md: "w-[8px] h-[8px]",

  lg: "w-[12px] h-[12px]",
};

export const colorClasses: Record<DotColor, string> = {
  primary: "bg-primary",

  secondary: "bg-secondary",

  danger: "bg-danger",

  success: "bg-success",

  gray: "bg-gray-400",

  white: "bg-white",
};
