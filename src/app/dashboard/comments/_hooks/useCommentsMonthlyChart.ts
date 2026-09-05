// src/app/dashboard/comments/_hooks/useCommentsMonthlyChart.ts
import { useQuery } from "@tanstack/react-query";
import { getCommentsMonthlyChart } from "../_services/comments-overview.api";

/**
 * وقتی ماه از دراپ‌داون LineChart عوض می‌شه، این هوک دیتای همون ماه رو فچ می‌کنه.
 * month=null یعنی هنوز کاربر ماهی انتخاب نکرده و باید از دیتای پیش‌فرض (۳۰ روز اخیر) استفاده شه.
 */
export function useCommentsMonthlyChart(month: string | null) {
  return useQuery({
    queryKey: ["commentsMonthlyChart", month],
    queryFn: () => getCommentsMonthlyChart(month as string),
    enabled: month !== null,
    staleTime: 5 * 60 * 1000,
  });
}