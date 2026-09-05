import type { ComponentType } from "react";
import type { IconProps } from "../../types/IconTypes";

export type OrderStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type OrderStatusConfig = {
  label: string;
  Icon: ComponentType<IconProps>;
};

export type OrderStatusBadgeProps = {
  status: OrderStatus;
};