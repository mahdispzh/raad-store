// _hooks/useOrdersOverview.ts
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getOrdersOverview,
  getOrderMonthlyRevenue,
  MonthlyRevenueDayPoint,
} from "../_services/dashboard-stats.api";
import {
  getCurrentJalaliYear,
  getJalaliMonthNumber,
  PERSIAN_MONTHS,
} from "@/src/shared/utils/analytics";

const STALE_TIME_MS = 1000 * 60 * 5; // ۵ دقیقه

/** summary + report + charts سفارش‌ها — منبع اصلی داده‌ی صفحه‌ی overview */
export function useOrdersOverview() {
  return useQuery({
    queryKey: ["orders-overview"],
    queryFn: getOrdersOverview,
    staleTime: STALE_TIME_MS,
  });
}

function getCurrentPersianMonthName(): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "long" }).format(
    new Date(),
  );
}

/**
 * درآمد روزانه‌ی یک ماه شمسی انتخابی — برای LineChart با dropdown ماه.
 * خودش state انتخاب ماه رو نگه می‌داره تا کامپوننت صفحه فقط مصرف‌کننده باشه.
 */
export function useOrderMonthlyRevenueChart() {
  const [monthName, setMonthName] = useState<string>(
    getCurrentPersianMonthName(),
  );

  const jalaaliYear = getCurrentJalaliYear();
  const jalaaliMonth =
    getJalaliMonthNumber(monthName) ?? PERSIAN_MONTHS.indexOf("فروردین") + 1;

  const query = useQuery({
    queryKey: ["orders-monthly-revenue", jalaaliYear, jalaaliMonth],
    queryFn: () => getOrderMonthlyRevenue(jalaaliYear, jalaaliMonth),
    staleTime: STALE_TIME_MS,
  });

  return {
    monthName,
    onMonthChange: setMonthName,
    daysInMonth: query.data?.daysInMonth,
    data:
      query.data?.revenueByDay.map((r: MonthlyRevenueDayPoint) => ({
        day: r.day,
        value: r.revenue,
      })) ?? [],
    isLoading: query.isLoading,
  };
}