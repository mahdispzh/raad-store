import { productKeys } from "@/src/app/dashboard/products/_lib/product-keys";
import { productApi } from "@/src/app/dashboard/products/_services/product.api";
import { useQuery } from "@tanstack/react-query";

export function useProducts(
  page = 1,
  limit = 10,
  params?: { sort?: string; discount?: string },
) {
  return useQuery({
    queryKey: productKeys.list(page, limit, params),
    queryFn: () => productApi.getAll(page, limit, params),
  });
}
