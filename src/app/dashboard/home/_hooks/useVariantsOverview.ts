import { useQuery } from "@tanstack/react-query";
import { getVariantsOverview } from "../_services/admin-overview.api";

export const useVariantsOverview = () => {
  return useQuery({
    queryKey: ["variants-overview"],
    queryFn: getVariantsOverview,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};