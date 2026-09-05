import { useQuery } from "@tanstack/react-query";
import { getUsersMonthlyChart } from "../_services/users-overview.api";
import { getJalaliMonthNumber, getCurrentJalaliYear } from "@/src/shared/utils/analytics";

export function useUsersMonthlyChart(monthName: string | null) {
  const jm = monthName ? getJalaliMonthNumber(monthName) : null;
  const jy = getCurrentJalaliYear();

  return useQuery({
    queryKey: ["usersMonthlyChart", jy, jm],
    queryFn: () => getUsersMonthlyChart(jy, jm as number),
    enabled: jm !== null,
    staleTime: 5 * 60 * 1000,
  });
}