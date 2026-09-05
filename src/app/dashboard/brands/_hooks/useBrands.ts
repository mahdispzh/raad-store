// src/app/dashboard/brands/_hooks/useBrands.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  removeBrand,
} from "../_services/brands.api";
import { brandKeys } from "../_lib/brand-keys";

// همون هوک قبلی — بدون تغییر
export const useCreateBrand = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createBrand(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      router.push("/dashboard/brands");
    },

    onError: (error: any) => {
      if (error?.response?.status === 409) {
        alert("❌ این اسلاگ قبلاً استفاده شده است. لطفاً نام دیگری انتخاب کنید.");
      } else {
        alert("❌ خطا در ثبت برند. لطفاً دوباره تلاش کنید.");
      }
      console.error("Error creating brand:", error);
    },
  });
};

// ✅ جدید — لیست صفحه‌بندی‌شده برای جدول
export function useBrandsList(page = 1, limit = 10, sort?: string) {
  return useQuery({
    queryKey: brandKeys.list(page, limit, sort),
    queryFn: () => getBrands({ page, limit, ...(sort ? { sort } : {}) }),
  });
}

// ✅ جدید — یک برند خاص (برای صفحه‌ی ویرایش)
export function useBrand(id?: number) {
  return useQuery({
    queryKey: brandKeys.detail(id ?? 0),
    queryFn: () => getBrandById(id!),
    enabled: !!id,
  });
}

// ✅ جدید — ویرایش برند
export function useUpdateBrand() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateBrand(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all });
      router.push("/dashboard/brands");
    },
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        alert("❌ این اسلاگ قبلاً استفاده شده است. لطفاً نام دیگری انتخاب کنید.");
      } else {
        alert("❌ خطا در ویرایش برند. لطفاً دوباره تلاش کنید.");
      }
      console.error("Error updating brand:", error);
    },
  });
}

// ✅ جدید — حذف برند
export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => removeBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all });
    },
  });
}