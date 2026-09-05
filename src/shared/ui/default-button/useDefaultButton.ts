// _hooks/useDefaultButton.ts

import { getRoundedClass, getSizeClasses, getStateStyles, getVariantClasses } from "./default-button.constants";
import { ButtonStyle, ButtonType } from "./default-button.types";


const LOADER_COLOR_BY_VARIANT: Record<string, string> = {
  "primary-fill": "text-accent",
  "primary-outline": "text-primary",
  "secondary-fill": "text-white",
  "secondary-outline": "text-danger",
};

export function useDefaultButton(
  type: ButtonType = "primary",
  style: ButtonStyle = "fill",
  isLoading: boolean = false,
  disabled: boolean = false,
  rounded: boolean = false,
) {
  // ترکیب کلاس‌ها
  const buttonClassName = [
    getVariantClasses(type, style, isLoading, disabled),
    getRoundedClass(rounded),
    getSizeClasses(),
    getStateStyles(disabled, isLoading),
  ]
    .filter(Boolean)
    .join(" ");

  // تعیین رنگ اسپینر
  const getLoaderColor = (): string => {
    if (disabled) return "text-gray-400";
    return LOADER_COLOR_BY_VARIANT[`${type}-${style}`] ?? "text-current";
  };

  return {
    buttonClassName,
    showLoader: isLoading,
    getLoaderColor,
  };
}
