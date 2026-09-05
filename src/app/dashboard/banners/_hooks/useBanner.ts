// src/app/dashboard/banners/_hooks/useBanner.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { bannerKeys } from "../_lib/banner-keys";
import {
  createBanner,
  getBannerById,
  getBanners,
  removeBanner,
  updateBanner,
} from "../_services/banners.api";

// همون هوک قبلی — بدون تغییر
export const useCreateBanner = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createBanner(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      // alert("✅ بنر با موفقیت اضافه شد.");
      router.push("/dashboard/banners");
    },
    onError: (error: any) => {
      alert("❌ خطا در ثبت بنر. لطفاً دوباره تلاش کنید.");
      console.error("Error creating banner:", error);
    },
  });
};

// ✅ جدید — لیست بنرها (بدون pagination، طبق ساختار API فعلی)
export function useBannersList() {
  return useQuery({
    queryKey: bannerKeys.all,
    queryFn: getBanners,
  });
}

// ✅ جدید — یک بنر خاص (برای صفحه‌ی ویرایش)
export function useBanner(id?: number) {
  return useQuery({
    queryKey: bannerKeys.detail(id ?? 0),
    queryFn: () => getBannerById(id!),
    enabled: !!id,
  });
}

// ✅ جدید — ویرایش بنر
export function useUpdateBanner() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateBanner(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all });
      alert("✅ بنر با موفقیت ویرایش شد.");
      router.push("/dashboard/banners");
    },
    onError: (error: any) => {
      alert("❌ خطا در ویرایش بنر. لطفاً دوباره تلاش کنید.");
      console.error("Error updating banner:", error);
    },
  });
}

// ✅ جدید — حذف بنر
export function useDeleteBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => removeBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerKeys.all });
    },
  });
}
