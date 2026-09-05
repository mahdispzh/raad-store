// src/app/dashboard/brands/_services/brands.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

// ============ تایپ‌ها ============
export interface Brand {
  id: number;
  name: string;
  slug: string;
  image: string;
  created_at?: string;
}

export interface BrandsResponse {
  data: Brand[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

// ============ دریافت لیست برندها ============
export const getBrands = async (params?: {
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<BrandsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.sort) queryParams.append("sort", params.sort);

  const url = `/protected/brands${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return fetcher<BrandsResponse>(() => apiClient.get(url));
};

// ============ دریافت یک برند ============
export const getBrandById = (id: number) => {
  return fetcher<Brand>(() => apiClient.get(`/protected/brands/${id}`));
};

// ============ ایجاد برند جدید (با FormData) ============
export const createBrand = (formData: FormData) => {
  return fetcher<Brand>(() =>
    apiClient.post("/protected/brands", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
};

// ============ ویرایش برند (با FormData) ============
export const updateBrand = (id: number, formData: FormData) => {
  return fetcher<Brand>(() =>
    apiClient.put(`/protected/brands/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
};

// ============ حذف برند ============
export const removeBrand = (id: number) => {
  return fetcher<{ success: boolean }>(() =>
    apiClient.delete(`/protected/brands/${id}`),
  );
};