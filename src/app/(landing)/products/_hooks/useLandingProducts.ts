import { useQuery } from "@tanstack/react-query";
import { getPublicProducts } from "../_services/products.server";
import type { ProductsResponse } from "../_types";

type SortType = "likes" | "views" | "sold" | "newest" | "discount";

interface Filters {
  minPrice?: number;
  maxPrice?: number;
  colorIds?: number[];
  categoryId?: number;
  sort?: SortType;
  page?: number;
  limit?: number;
}

export function useLandingProducts(filters?: Filters) {
  const colorParam = filters?.colorIds?.length
    ? filters.colorIds.join(",")
    : undefined;

  const queryKey = ["publicProducts", filters];

  const { data, isLoading, isError, error } = useQuery<ProductsResponse, Error>(
    {
      queryKey,
      queryFn: () => {
        // فقط sort‌هایی که API قبول می‌کند را ارسال کن
        const allowedSorts: SortType[] = [
          // "likes",
          "views",
          "sold",
          "newest",
          "discount",
        ];
        const sortParam =
          filters?.sort && allowedSorts.includes(filters.sort)
            ? filters.sort
            : undefined;

        return getPublicProducts({
          ...(filters?.minPrice !== undefined && {
            minPrice: filters.minPrice,
          }),
          ...(filters?.maxPrice !== undefined && {
            maxPrice: filters.maxPrice,
          }),
          ...(colorParam !== undefined && { color: colorParam }),
          ...(sortParam !== undefined && { sort: sortParam as any }),
          ...(filters?.categoryId !== undefined && {
            categoryId: filters.categoryId,
          }),
        });
      },
      enabled: true,
    },
  );
  console.log("data Products", data);
  return { data, isLoading, isError, error };
}
