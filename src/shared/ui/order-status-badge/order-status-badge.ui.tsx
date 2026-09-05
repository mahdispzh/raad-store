"use client";

import { Text } from "../../ui";
import { useOrderStatusBadge } from "./useOrderStatusBadge";
import type { OrderStatusBadgeProps } from "./order-status-badge.types";

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const { label, Icon } = useOrderStatusBadge(status);

  return (
    <span
      className="
      w-30
        inline-flex
        items-center
        justify-center
        gap-1
        rounded-full
        border
        border-primary
        px-2
        py-1
      "
    >
      <Icon size="xs" color="text-primary" />

      <Text text={label} size="sm" color="primary" weight="medium" />
    </span>
  );
}
