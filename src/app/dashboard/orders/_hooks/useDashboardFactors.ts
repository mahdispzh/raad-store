// _hooks/useDashboardFactors.ts

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAdminOrders } from "../_services/factors.api";
import { FactorsResponse, RawOrdersResponse } from "../_types/factors.types";
import { mapOrderToFactor } from "../_utils/factors.utils";
import { DEFAULT_PAGE_SIZE } from "../_constants/factors.constants";

export function useDashboardFactors(
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
  search: string = ""
) {
  return useQuery<FactorsResponse>({
    queryKey: ["factors", page, limit, search],

    queryFn: async () => {
      const json: RawOrdersResponse = await getAdminOrders(page, limit, search);

    const filteredData = json.data.map(mapOrderToFactor); // 👈 دیگه .filter لازم نیست

      return {
        data: filteredData,
        total: json.meta.total,
        page: json.meta.page,
        limit: json.meta.limit,
      };
    },

    placeholderData: keepPreviousData,
  });
}