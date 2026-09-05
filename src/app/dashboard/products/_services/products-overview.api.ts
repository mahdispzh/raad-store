import { apiClient, fetcher } from "@/src/shared/api/fetcher";

import {
  BottomSellingMonthlyResult,
  TopSellingMonthlyResult,
} from "@/src/app/api/protected/admin-overview/products/_lib/report";

export interface ProductsOverviewResponse {
  summary: unknown;
  report: unknown;
  charts: unknown;
  topSellingMonthly: TopSellingMonthlyResult | null;
  bottomSellingMonthly: BottomSellingMonthlyResult | null;
}

export const getProductsOverview = (year: number, month: number) => {
  return fetcher<ProductsOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/products", {
      params: { year, month },
    }),
  );
};