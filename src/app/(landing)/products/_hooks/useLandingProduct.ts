import { useQuery } from "@tanstack/react-query";
import { getPublicProductBySlug } from "../_services/products.server";
import { ProductItem } from "../_types";

export function useLandingProduct(slug: string) {
  const query = useQuery<ProductItem | null, Error>({
    queryKey: ["publicProduct", slug],
    queryFn: async () => {
      // دریافت مستقیم محصول با slug
      const product = await getPublicProductBySlug(slug);
      return product;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // ۵ دقیقه کش
    retry: 1,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
