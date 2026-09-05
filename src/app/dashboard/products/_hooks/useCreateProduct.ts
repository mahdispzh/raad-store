"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../_services/product.api";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => productApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
