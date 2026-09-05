import { useMemo } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import type { PieChartItem } from "./pie-chart.types";
import { PERSIAN_DIGITS, DEFAULT_PIE_CHART_COLORS } from "./pie-chart.constants";

export function toPersianDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]!);
}

export function usePieChart(data: PieChartItem[]) {
  // اگه آیتمی رنگ مشخص نکرده باشه، بر اساس ترتیبش رنگ پیش‌فرض میگیره
  const resolvedData = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        color:
          item.color ??
          DEFAULT_PIE_CHART_COLORS[index % DEFAULT_PIE_CHART_COLORS.length]!,
      })),
    [data],
  );

  const chartData = useMemo(
    () =>
      resolvedData.map((item) => ({
        key: item.key,
        count: item.value,
        fill: `var(--color-${item.key})`,
      })),
    [resolvedData],
  );

  const sortedData = useMemo(
    () => [...resolvedData].sort((a, b) => b.value - a.value),
    [resolvedData],
  );

  const chartConfig = useMemo(
    () =>
      resolvedData.reduce((acc, item) => {
        acc[item.key] = { label: item.label, color: item.color };
        return acc;
      }, {} as ChartConfig),
    [resolvedData],
  );

  return { chartData, sortedData, chartConfig };
}
