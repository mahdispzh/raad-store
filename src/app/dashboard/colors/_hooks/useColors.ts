// _hooks/useColors.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { colorsApi,  } from "../_services/colors.api";
import { colorKeys } from "../_lib/color-keys";
import { CreateColorDto, UpdateColorDto } from "../_types/color.type";

export function useColorsList(page = 1, limit = 10, sort?: string) {
  return useQuery({
    queryKey: colorKeys.list(page, limit, sort),
    queryFn: () => colorsApi.getAll(page, limit, sort),
  });
}

// _hooks/useColors.ts (اضافه‌کردن این تابع)
export function useColor(id?: number) {
  return useQuery({
    queryKey: colorKeys.detail(id ?? 0),
    queryFn: () => colorsApi.getOne(id!),
    enabled: !!id,
  });
}

export function useCreateColor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateColorDto) => colorsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorKeys.all });
    },
  });
}

export function useUpdateColor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateColorDto }) =>
      colorsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorKeys.all });
    },
  });
}

export function useDeleteColor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => colorsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: colorKeys.all });
    },
  });
}