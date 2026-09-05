// _hooks/useOrderDetail.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrder, updateOrderStatus } from "../_services/factors.api";
import { RawOrder } from "../_types/factors.types";
import { mapOrderToDetail } from "../_utils/factors.utils";

export function useOrderDetail(orderId: string | number | undefined) {
  const queryClient = useQueryClient();

  // کوئری برای دریافت جزئیات سفارش
  const query = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const order: RawOrder = await getOrder(orderId as string | number);
      return mapOrderToDetail(order);
    },
    enabled: !!orderId,
    retry: 1,
    staleTime: 0, // همیشه داده‌های تازه دریافت کن
  });

  // میوتیشن برای آپدیت وضعیت
  const statusMutation = useMutation({
    mutationFn: async (newStatus: number) => {
      if (!orderId) {
        throw new Error("شناسه سفارش معتبر نیست");
      }

      return updateOrderStatus(Number(orderId), { status: newStatus });
    },
    onSuccess: async () => {
      // رفرش کردن داده‌ها
      await Promise.all([
        // رفرش کردن جزئیات سفارش
        queryClient.invalidateQueries({
          queryKey: ["order", orderId],
          exact: true,
        }),
        // رفرش کردن لیست سفارشات
        queryClient.invalidateQueries({
          queryKey: ["factors"],
        }),
        // رفرش کردن آمار داشبورد
        queryClient.invalidateQueries({
          queryKey: ["dashboard-stats"],
        }),
      ]);

      // فورس رفرش کردن داده فعلی
      await queryClient.refetchQueries({
        queryKey: ["order", orderId],
        exact: true,
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "خطا در تغییر وضعیت سفارش";
      console.error("❌ خطا در تغییر وضعیت:", errorMessage);
    },
  });

  return {
    order: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    updateStatus: statusMutation.mutateAsync,
    isUpdatingStatus: statusMutation.isPending,
    updateStatusError: statusMutation.error,
  };
}