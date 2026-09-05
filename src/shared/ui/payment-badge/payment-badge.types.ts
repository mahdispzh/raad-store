import type { ReactNode } from "react";

export type PaymentBadgeColor =
  | "success"
  | "danger"
  | "warning"
  | "gray";

export type PaymentBadgeType = "dot" | "icon";

export interface PaymentBadgeProps {
  text: string;

  color: PaymentBadgeColor;

  size?: "sm" | "md";

  type?: PaymentBadgeType;

  icon?: ReactNode;

  className?: string;
}