import { useQuery } from "@tanstack/react-query";
import { productKeys } from "../_lib/product-keys";
import { productApi } from "../_services/product.api";

export function useProduct(slug?: string) {
  return useQuery({
    queryKey: productKeys.detail(slug ?? ""),
    queryFn: () => productApi.getOne(slug!),
    enabled: !!slug,
  });
}
