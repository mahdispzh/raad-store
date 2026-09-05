import type {
  PaymentBadgeColor,
  PaymentBadgeType,
} from "./payment-badge.types";

export const PAYMENT_BADGE_COLORS = {
  success: {
    text: "text-primary",
    border: "border-primary",
  },
  danger: {
    text: "text-primary",
    border: "border-primary",
  },
  warning: {
    text: "text-primary",
    border: "border-primary",
  },
  gray: {
    text: "text-primary",
    border: "border-primary",
  },
} as const satisfies Record<
  PaymentBadgeColor,
  {
    text: string;
    border: string;
  }
>;

export const DEFAULT_PAYMENT_BADGE_SIZE = "sm" as const;

export const DEFAULT_PAYMENT_BADGE_TYPE: PaymentBadgeType = "dot";

export const PAYMENT_BADGE_SIZES = ["sm", "md"] as const;