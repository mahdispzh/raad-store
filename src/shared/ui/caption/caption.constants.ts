import { CaptionColor, CaptionSize, CaptionWeight } from "./caption.types";

// _constants/caption._constants.ts

// نگاشت سایز به کلاس CSS
export const sizeStyles: Record<CaptionSize, string> = {
  "2xs": "text-2xs",
  xs: "text-xs",
};

// نگاشت وزن به کلاس CSS
export const weightStyles: Record<CaptionWeight, string> = {
  light: "text-light",
  regular: "text-regular",
  medium: "text-medium",
  bold: "text-bold",
};

// نگاشت رنگ به کلاس CSS
export const colorStyles: Record<CaptionColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  danger: "text-danger",
  success: "text-success",
  gray: "text-gray",
    accent: "text-accent",

};
