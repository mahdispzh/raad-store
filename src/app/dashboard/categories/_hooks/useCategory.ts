// src/app/dashboard/categories/_hooks/useCategory.ts
import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "../_lib/category-keys";
import { getCategoryById } from "../_services/categories.api";

export function useCategory(id?: number | string) {
  return useQuery({
    queryKey: categoryKeys.detail(id ?? ""),
    queryFn: () => getCategoryById(id!),
    enabled: !!id,
  });
}