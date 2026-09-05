// src/app/dashboard/categories/_servises/categories.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: number | null;
  created_at?: string;
};

type CategoriesListResponse = {
  data: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
};

// ============ دریافت لیست دسته‌بندی‌ها ============
export const getCategories = (page = 1, limit = 10) => {
  return fetcher<CategoriesListResponse>(() =>
    apiClient.get(`/protected/categories?page=${page}&limit=${limit}`),
  );
};

// ============ دریافت یک دسته‌بندی با id ============
export const getCategoryById = (id: number | string) => {
  return fetcher<Category>(() =>
    apiClient.get(`/protected/categories/${id}`),
  );
};

// ============ ایجاد دسته‌بندی جدید ============
export const createCategory = (formData: FormData) => {
  return fetcher<Category>(() =>
    apiClient.post("/protected/categories", formData),
  );
};

// ============ ویرایش دسته‌بندی ============
export const updateCategory = (id: number | string, formData: FormData) => {
  return fetcher<Category>(() =>
    apiClient.put(`/protected/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
};

// ============ حذف دسته‌بندی ============
export const deleteCategory = (id: number | string) => {
  return fetcher<{ success: boolean }>(() =>
    apiClient.delete(`/protected/categories/${id}`),
  );
};