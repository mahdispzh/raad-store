// src/app/dashboard/categories/_hooks/useCategoriesOverview.ts
import { useQuery } from "@tanstack/react-query";
import { getCategoriesOverview } from "../_services/categories-overview.api";

export function useCategoriesOverview() {
  return useQuery({
    queryKey: ["categoriesOverview"],
    queryFn: getCategoriesOverview,
    staleTime: 5 * 60 * 1000,
  });
}