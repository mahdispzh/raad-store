import { useQuery } from "@tanstack/react-query";
import { getAdminOverview } from "../_services/admin-overview.api";

export const useAdminOverview = (
  jalaaliYear?: number,
  jalaaliMonth?: number | null,
) => {
  return useQuery({
    queryKey: ["admin-overview", jalaaliYear, jalaaliMonth],
    queryFn: () =>
      getAdminOverview(jalaaliYear, jalaaliMonth ?? undefined),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};