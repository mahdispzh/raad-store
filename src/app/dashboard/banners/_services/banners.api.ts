// src/app/dashboard/banners/_services/banners.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface Banner {
  id: number;
  image: string;
  alt: string | null;
  sort_order: number | null;
  is_active: boolean | null;   // ✅ اصلاح شد
  created_at?: string;
}
export const getBanners = async () => {
  return fetcher<Banner[]>(() => apiClient.get("/protected/banners"));
};

export const getBannerById = (id: number) => {
  return fetcher<Banner>(() => apiClient.get(`/protected/banners/${id}`));
};

export const createBanner = (formData: FormData) => {
  return fetcher<Banner>(() =>
    apiClient.post("/protected/banners", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
};

export const updateBanner = (id: number, formData: FormData) => {
  return fetcher<Banner>(() =>
    apiClient.put(`/protected/banners/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
};

export const removeBanner = (id: number) => {
  return fetcher<{ success: boolean }>(() =>
    apiClient.delete(`/protected/banners/${id}`),
  );
};