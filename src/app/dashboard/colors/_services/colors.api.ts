// _services/colors.api.ts
import { apiClient } from "@/src/shared/api/client";
import { fetcher } from "@/src/shared/api/fetcher";
import { ColorResponse, ColorsListResponse, CreateColorDto, UpdateColorDto } from "../_types/color.type";



export const colorsApi = {
  getAll: (page: number, limit: number, sort?: string) =>
    fetcher<ColorsListResponse>(() =>
      apiClient.get("protected/colors", { params: { page, limit, sort } }),
    ),

  getOne: (id: number) =>
    fetcher<ColorResponse>(() => apiClient.get(`protected/colors/${id}`)),

  create: (data: CreateColorDto) =>
    fetcher<ColorResponse>(() =>
      apiClient.post("protected/colors", { name: data.name, hexCode: data.hexCode }),
    ),

  update: (id: number, data: UpdateColorDto) =>
    fetcher<ColorResponse>(() =>
      apiClient.put(`protected/colors/${id}`, { name: data.name, hexCode: data.hexCode }),
    ),

  remove: (id: number) =>
    fetcher<{ success: boolean }>(() => apiClient.delete(`protected/colors/${id}`)),
};

// alias برای سازگاری با جایی که قبلاً createColor مستقیم ایمپورت شده بود
export const createColor = colorsApi.create;