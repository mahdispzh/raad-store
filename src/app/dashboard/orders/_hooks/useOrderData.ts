// _hooks/useOrderData.ts
"use client";

import orderData from "../_constants/text.json";

export function useOrderData() {
  const order = orderData.order;

  const formatNumber = (num: number) => {
    return num.toLocaleString("fa-IR");
  };

  const totalSum = order.items.reduce((sum, item) => {
    return sum + (item.amount - item.discount) * item.quantity;
  }, 0);

  return {
    order,
    totalSum,
    formatNumber,
  };
}