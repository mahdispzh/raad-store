import { STATUS_BADGE_COLORS } from "./status-badge.constants";
import type { StatusBadgeColor } from "./status-badge.types";

/**
 * دریافت استایل رنگ بج
 */
export function useStatusBadgeStyles(color: StatusBadgeColor) {
  return STATUS_BADGE_COLORS[color];
}

/**
 * بررسی معتبر بودن رنگ
 */
export function useIsValidStatusColor(
  color: string,
): color is StatusBadgeColor {
  return color in STATUS_BADGE_COLORS;
}