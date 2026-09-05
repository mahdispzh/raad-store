// src/app/dashboard/categories/_hooks/useUpdateCategory.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "../_lib/category-keys";
import { updateCategory } from "../_services/categories.api";

type UpdateCategoryVariables = { id: number | string; data: FormData };

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryVariables) =>
      updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.id),
      });
    },
  });
}