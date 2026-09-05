// src/app/dashboard/blogs/_hooks/useBlogsMonthlyChart.ts
import { useQuery } from "@tanstack/react-query";
import { getBlogsMonthlyChart } from "../_services/blogs-overview.api";
import { getCurrentJalaliYear } from "@/src/shared/utils/analytics";

/**
 * دیتای روزانه‌ی بلاگ‌های یک ماه شمسی خاص برای LineChart.
 * blogs-overview.api.ts از قبل اسم ماه رو مستقیم قبول می‌کنه
 * (route.ts سمت سرور خودش تبدیلش می‌کنه به عدد)، پس نیازی به
 * تبدیل دستی مثل useUsersMonthlyChart نیست؛ فقط سال جاری رو
 * صریح پاس می‌دیم تا queryKey با تغییر سال هم درست تازه بشه.
 */
export function useBlogsMonthlyChart(monthName: string | null) {
  const jy = getCurrentJalaliYear();

  return useQuery({
    queryKey: ["blogsMonthlyChart", jy, monthName],
    queryFn: () => getBlogsMonthlyChart(monthName as string, jy),
    enabled: monthName !== null,
    staleTime: 5 * 60 * 1000,
  });
}