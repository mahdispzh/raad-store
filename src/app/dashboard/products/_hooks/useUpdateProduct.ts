import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "../_lib/product-keys";
import { productApi } from "../_services/product.api";

type UpdateProductVariables = {
  slug: string;
  data: FormData;
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: UpdateProductVariables) =>
      productApi.update(slug, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.slug),
      });
    },
  });
}
