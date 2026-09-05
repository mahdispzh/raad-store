// api/categories.api.ts

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { Category, CategoriesApiResponse } from "./categories.types";

export const categoryApi = {
  getCategories: async (): Promise<CategoriesApiResponse> => {
    return fetcher<CategoriesApiResponse>(() =>
      apiClient.get("public/categories"),
    );
  },

  // اگر نیاز به دریافت دسته‌بندی‌های اصلی دارید
  getMainCategories: async (): Promise<CategoriesApiResponse> => {
    return fetcher<CategoriesApiResponse>(() =>
      apiClient.get("public/categories?parentId=null"),
    );
  },

  // اگر نیاز به دریافت زیردسته‌ها دارید
  getSubCategories: async (parentId: number): Promise<CategoriesApiResponse> => {
    return fetcher<CategoriesApiResponse>(() =>
      apiClient.get(`public/categories?parentId=${parentId}`),
    );
  },

  // اگر نیاز به دریافت یک دسته خاص دارید
  getCategoryById: async (categoryId: number): Promise<Category> => {
    return fetcher<Category>(() =>
      apiClient.get(`public/categories/${categoryId}`),
    );
  },
};