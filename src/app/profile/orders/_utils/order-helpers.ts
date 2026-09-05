// src/app/profile/orders/_utils/order-helpers.ts

import { OrderItem } from "../_types/order.types";

export const calculateTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => {
    const priceAfterDiscount = (item.amount - item.discount) * item.quantity;
    return sum + priceAfterDiscount;
  }, 0);
};

export const formatPrice = (num: number): string => {
  return num.toLocaleString("fa-IR");
};

export const getOrderStatus = (status: string): { label: string; color: string } => {
  const statusMap: Record<string, { label: string; color: string }> = {
    delivered: { label: "تحویل شده", color: "success" },
    processing: { label: "در حال پردازش", color: "warning" },
    returned: { label: "مرجوع شده", color: "danger" },
    canceled: { label: "لغو شده", color: "gray" },
  };
  return statusMap[status] || { label: status, color: "gray" };
};