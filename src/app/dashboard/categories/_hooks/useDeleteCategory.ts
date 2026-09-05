// src/app/dashboard/categories/_hooks/useDeleteCategory.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "../_lib/category-keys";
import { deleteCategory } from "../_services/categories.api";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}