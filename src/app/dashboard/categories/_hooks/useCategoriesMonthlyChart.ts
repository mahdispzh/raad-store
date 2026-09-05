// src/app/dashboard/categories/_hooks/useCategoriesMonthlyChart.ts
import { useQuery } from "@tanstack/react-query";
import { getCategoriesMonthlyChart } from "../_services/categories-overview.api";
import {
  getJalaliMonthNumber,
  getCurrentJalaliYear,
} from "@/src/shared/utils/analytics";

export function useCategoriesMonthlyChart(month: string | null) {
  const jm = month ? getJalaliMonthNumber(month) : null;
  const jy = getCurrentJalaliYear();

  return useQuery({
    queryKey: ["categoriesMonthlyChart", jy, jm],
    queryFn: () => getCategoriesMonthlyChart(jm as number, jy),
    enabled: jm !== null,
    staleTime: 5 * 60 * 1000,
  });
}