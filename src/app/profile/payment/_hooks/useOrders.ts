// src/app/profile/orders/_hooks/useOrders.ts

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../_services/order.api";
import type { CreateOrderData, CreateOrderResponse } from "../_types/order.types";
import { toast } from "react-hot-toast";

// 🔑 کلیدهای کش
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (page: number, limit: number) => [...orderKeys.lists(), { page, limit }] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: number) => [...orderKeys.details(), id] as const,
};

// 📦 هوک دریافت سفارشات
export function useOrders(page = 1, limit = 10) {
  return useQuery({
    queryKey: orderKeys.list(page, limit),
    queryFn: () => orderService.getOrders(page, limit),
    staleTime: 5 * 60 * 1000, // 5 دقیقه
    retry: 2,
  });
}

// ✏️ هوک ایجاد سفارش
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderData) => orderService.createOrder(data),
    onSuccess: () => {
      toast.success('سفارش شما با موفقیت ثبت شد');
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'خطا در ثبت سفارش');
    },
  });
}

// ✏️ هوک آپدیت وضعیت سفارش (status و/یا paymentStatus)
// استفاده بعد از نتیجه‌ی پرداخت:
//   موفق     -> mutateAsync({ orderId, data: { status: 1, paymentStatus: 1 } })
//   ناموفق   -> mutateAsync({ orderId, data: { paymentStatus: 2 } })
//   نامشخص   -> mutateAsync({ orderId, data: { paymentStatus: 3 } })
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      data,
    }: {
      orderId: number;
      data: { status?: number; paymentStatus?: number };
    }) => orderService.updateOrder(orderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.details() });
    },
    onError: (error: any) => {
      console.error("❌ خطا در آپدیت وضعیت سفارش:", error);
    },
  });
}