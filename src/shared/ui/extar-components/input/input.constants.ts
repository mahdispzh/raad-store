import type { InputSize, InputStatus } from "./input.types";

export const SIZE_CLASSES: Record<InputSize, string> = {
  md: "h-[3.91vw] px-4 text-base",
  sm: "h-[2.3vw] px-3 text-sm",
};

export const STATUS_CLASSES: Record<InputStatus, string> = {
  default: "border-primary text-primary focus:border-primary",
  error: "border-danger text-danger focus:border-danger",
  success: "border-success text-success focus:border-success",
};

export const LABEL_CLASSES: Record<InputStatus, string> = {
  default: "text-primary",
  error: "text-danger",
  success: "text-success",
};

export const HELPER_CLASSES: Record<InputStatus, string> = {
  default: "text-primary",
  error: "text-danger",
  success: "text-success",
};
