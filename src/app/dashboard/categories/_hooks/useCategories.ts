// src/app/dashboard/categories/_hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "../_lib/category-keys";
import { getCategories } from "../_services/categories.api";

export function useCategories(page = 1, limit = 10) {
  return useQuery({
    queryKey: categoryKeys.list(page, limit),
    queryFn: () => getCategories(page, limit),
  });
}