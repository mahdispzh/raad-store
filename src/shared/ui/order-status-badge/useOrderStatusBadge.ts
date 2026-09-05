import { ORDER_STATUS_MAP } from "./order-status-badge.constants";
import type { OrderStatus } from "./order-status-badge.types";

export function useOrderStatusBadge(status: OrderStatus) {
  const config = ORDER_STATUS_MAP[status];

  return {
    label: config.label,
    Icon: config.Icon,
  };
}
