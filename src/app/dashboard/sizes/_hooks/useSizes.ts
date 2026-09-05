// src/app/dashboard/sizes/_hooks/useSizes.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { sizeKeys } from "../_lib/size-keys";
import {
  createSize,
  getAllSizes,
  getSizeById,
  getSizes,
  removeSize,
  updateSize,
  UpdateSizePayload,
} from "../_services/sizes.api";

// همون هوک قبلی — بدون تغییر (صفحه‌ی create فعلی بهش وابسته‌ست)
export const useCreateSize = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: sizesData, isLoading: isLoadingSizes } = useQuery({
    queryKey: ["sizes", "all"],
    queryFn: getAllSizes,
  });

  const mutation = useMutation({
    mutationFn: (data: { name: string; sortOrder?: number }) => {
      return createSize({
        name: data.name,
        sortOrder: data.sortOrder ?? (sizesData?.length ?? 0) + 1,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
      router.push("/dashboard/sizes");
    },

    onError: (error: any) => {
      alert("❌ خطا در ثبت سایز. لطفاً دوباره تلاش کنید.");
      console.error(error);
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isLoadingSizes,
  };
};

// ✅ جدید — لیست صفحه‌بندی‌شده برای جدول
export function useSizesList(page = 1, limit = 10, sort?: string) {
  return useQuery({
    queryKey: sizeKeys.list(page, limit, sort),
    queryFn: () => getSizes({ page, limit, ...(sort ? { sort } : {}) }),
  });
}
// ✅ جدید — یک سایز خاص (برای صفحه‌ی ویرایش)
export function useSize(id?: number) {
  return useQuery({
    queryKey: sizeKeys.detail(id ?? 0),
    queryFn: () => getSizeById(id!),
    enabled: !!id,
  });
}

// ✅ جدید — ویرایش سایز
export function useUpdateSize() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSizePayload }) =>
      updateSize(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
    },
  });
}

// ✅ جدید — حذف سایز
export function useDeleteSize() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => removeSize(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
    },
  });
}
