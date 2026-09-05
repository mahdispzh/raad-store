"use client";

import {
  CheckIcon,
  CloseIcon,
  WaitingIcon,
  ExclamationMarkIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";

import {
  DEFAULT_PAYMENT_BADGE_SIZE,
  DEFAULT_PAYMENT_BADGE_TYPE,
} from "./payment-badge.constants";
import type { PaymentBadgeProps } from "./payment-badge.types";
import { usePaymentBadgeStyles } from "./usePaymentBadge";

export function PaymentBadge({
  text,
  color,
  size = DEFAULT_PAYMENT_BADGE_SIZE,
  type = DEFAULT_PAYMENT_BADGE_TYPE,
  icon,
  className,
}: PaymentBadgeProps) {
  const styles = usePaymentBadgeStyles(color);

 const defaultIcon = {
  success: (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border ">
      <CheckIcon size="2xs" color="text-primary" />
    </span>
  ),
  danger: (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border ">
      <CloseIcon size="2xs" color="text-primary" />
    </span>
  ),
  warning: (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border ">
      <WaitingIcon size="2xs" color="text-primary" />
    </span>
  ),
  gray: (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border ">
      <ExclamationMarkIcon size="2xs" color="text-primary" />
    </span>
  ),
}[color];

  return (
    <span
      className={[
        "inline-flex w-28 items-center justify-center gap-1.5 rounded-full border bg-transparent px-3 py-1",
        styles.text,
        styles.border,
        className ?? "",
      ].join(" ")}
    >

    
            {type === "icon" ? (icon ?? defaultIcon) : defaultIcon}
  <Text
        text={text}
        size={size}
        weight="regular"
      />
    </span>
  );
}