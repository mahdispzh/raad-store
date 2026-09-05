import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "../_lib/product-keys";
import { productApi } from "../_services/product.api";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => productApi.remove(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}
