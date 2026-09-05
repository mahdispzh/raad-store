import { useQuery } from "@tanstack/react-query";
import { getUsersOverview } from "../_services/admin-overview.api";

export const useUsersOverview = () => {
  return useQuery({
    queryKey: ["users-overview"],
    queryFn: getUsersOverview,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};