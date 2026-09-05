// src/app/dashboard/sizes/_services/sizes.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

// ============ تایپ‌ها ============
export interface Size {
  id: number;
  name: string;
  sort_order: number;
  created_at?: string;
}

export interface SizesResponse {
  data: Size[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface CreateSizePayload {
  name: string;
  sortOrder: number;
}

export interface UpdateSizePayload {
  name: string;
  sortOrder: number;
}

// ============ دریافت لیست سایزها ============
export const getSizes = async (params?: {
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<SizesResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.sort) queryParams.append("sort", params.sort);

  const url = `/protected/sizes${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return fetcher<SizesResponse>(() => apiClient.get(url));
};

// ============ دریافت همه سایزها (بدون صفحه‌بندی) ============
export const getAllSizes = async (): Promise<Size[]> => {
  const response = await getSizes({ limit: 1000 });
  return response.data;
};

// ============ دریافت یک سایز ============
export const getSizeById = (id: number) => {
  return fetcher<Size>(() => apiClient.get(`/protected/sizes/${id}`));
};

// ============ ایجاد سایز جدید ============
export const createSize = (payload: CreateSizePayload) => {
  return fetcher<Size>(() =>
    apiClient.post("/protected/sizes", {
      name: payload.name,
      sortOrder: payload.sortOrder,
    }),
  );
};

// ============ ویرایش سایز ============
export const updateSize = (id: number, payload: UpdateSizePayload) => {
  return fetcher<Size>(() =>
    apiClient.put(`/protected/sizes/${id}`, {
      name: payload.name,
      sortOrder: payload.sortOrder,
    }),
  );
};

// ============ حذف سایز ============
export const removeSize = (id: number) => {
  return fetcher<{ success: boolean }>(() =>
    apiClient.delete(`/protected/sizes/${id}`),
  );
};