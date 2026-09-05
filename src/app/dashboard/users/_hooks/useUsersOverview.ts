import { useQuery } from "@tanstack/react-query";
import { getUsersOverview } from "../../home/_services/admin-overview.api";

export function useUsersOverview() {
  return useQuery({
    queryKey: ["usersOverview"],
    queryFn: getUsersOverview,
    staleTime: 5 * 60 * 1000,
  });
}