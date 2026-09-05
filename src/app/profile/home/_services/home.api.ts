// src/app/profile/home/_services/home.api.ts

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import type { FrequentProduct } from "../_types/home.types";


export async function getFrequentProducts(): Promise<FrequentProduct[]> {
  const res = await fetcher<{ report: { frequentProducts: FrequentProduct[] } }>(
    () => apiClient.get("protected/user-overview/orders"),
  );
  return res.report.frequentProducts;
}

export const homeApi = {
  getFrequentProducts,
};