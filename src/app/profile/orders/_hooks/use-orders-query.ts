// src/app/profile/orders/_hooks/use-orders-query.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getCurrentOrders,
  getDeliveredOrders,
  getReturnedOrders,
  getOrderStatusCounts,
} from "../_services/orders.api";
import { OrderStatusCounts, OrdersResponse } from "../_types/order.types";

export type OrderTabKey = "current" | "delivered" | "returned";

// نگاشت هر تب به تابع سرویس مربوطه
const fetchersByTab: Record<
  OrderTabKey,
  (page: number, limit: number) => Promise<OrdersResponse>
> = {
  current: (page, limit) => getCurrentOrders(page, limit),
  delivered: (page, limit) => getDeliveredOrders(page, limit),
  returned: (page, limit) => getReturnedOrders(page, limit),
};

/**
 * دریافت سفارش‌ها بر اساس تب فعال (جاری / تحویل شده / مرجوع شده)
 * جاری: status 1,2,3,4,5
 * تحویل شده: status 6
 * مرجوع شده: status 7
 */
export function useOrdersByTab(tab: OrderTabKey, page = 1, limit = 10) {
  return useQuery<OrdersResponse>({
    queryKey: ["orders", tab, page, limit],
    queryFn: () => fetchersByTab[tab](page, limit),
    staleTime: 60 * 1000,
  });
}

/**
 * دریافت تعداد سفارش‌ها برای نمایش عدد کنار هر تب
 */
export function useOrderStatusCounts() {
  return useQuery<OrderStatusCounts>({
    queryKey: ["orders", "status-counts"],
    queryFn: () => getOrderStatusCounts(),
    staleTime: 60 * 1000,
  });
}