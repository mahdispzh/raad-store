import { useQuery } from "@tanstack/react-query";
import { getCategoriesOverview } from "../_services/admin-overview.api";

export const useCategoriesOverview = () => {
  return useQuery({
    queryKey: ["categories-overview"],
    queryFn: getCategoriesOverview,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
