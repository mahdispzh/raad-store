import { CategoriesResponse } from "@/lib/react-query";
import { Category } from "@/src/app/dashboard/categories/components/categories/types/category.types";
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export const getCategories = async () => {
  return fetcher<CategoriesResponse>(() =>
    apiClient.get("public/categories?page=1&limit=1000"),
  );
};

export type CategoryResponse = Category;

export const getCategoryById = async (categoryId: number) => {
  return fetcher<CategoryResponse>(() =>
    apiClient.get(`public/categories/${categoryId}`),
  );
};
