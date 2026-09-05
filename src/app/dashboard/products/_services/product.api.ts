import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { Product } from "../_types/product.types";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
};

export const productApi = {
  getAll: (
    page: number,
    limit: number,
    params?: { sort?: string; discount?: string },
  ) =>
    fetcher<{ data: Product[]; meta: PaginationMeta }>(() =>
      apiClient.get(`protected/products`, {
        params: { page, limit, ...params },
      }),
    ),

  getOne: (slug: string) =>
    fetcher<Product>(() => apiClient.get(`protected/products/${slug}`)),

  create: (formData: FormData) =>
    fetcher<Product>(() =>
      apiClient.post("protected/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    ),

  update: (slug: string, formData: FormData) =>
    fetcher<Product>(() =>
      apiClient.put(`protected/products/${slug}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    ),

  remove: (slug: string) =>
    fetcher<void>(() => apiClient.delete(`protected/products/${slug}`)),
};
