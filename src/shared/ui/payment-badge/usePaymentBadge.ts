import { PAYMENT_BADGE_COLORS } from "./payment-badge.constants";
import type { PaymentBadgeColor } from "./payment-badge.types";

export function usePaymentBadgeStyles(color: PaymentBadgeColor) {
  return PAYMENT_BADGE_COLORS[color];
}

export function useIsValidPaymentColor(
  color: string,
): color is PaymentBadgeColor {
  return color in PAYMENT_BADGE_COLORS;
}