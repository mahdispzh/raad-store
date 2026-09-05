import { useQuery } from "@tanstack/react-query";
import { getProductsOverview } from "../_services/products-overview.api";

export function useProductsOverview(year: number, month: number | null) {
  return useQuery({
    queryKey: ["productsOverview", year, month],
    queryFn: () => getProductsOverview(year, month as number),
    enabled: month !== null,
    staleTime: 5 * 60 * 1000,
  });
}