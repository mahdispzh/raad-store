import { useQuery } from "@tanstack/react-query";
import { getOrdersOverview } from "../_services/admin-overview.api";

export const useOrdersOverview = () => {
  return useQuery({
    queryKey: ["orders-overview"],
    queryFn: getOrdersOverview,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
