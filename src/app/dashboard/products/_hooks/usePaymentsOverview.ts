import { useQuery } from "@tanstack/react-query";
import { getPaymentsOverview } from "../_services/admin-overview.api";

export const usePaymentsOverview = () => {
  return useQuery({
    queryKey: ["payments-overview"],
    queryFn: getPaymentsOverview,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};