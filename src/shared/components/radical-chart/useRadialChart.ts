import { useMemo } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import type { RadialChartItem } from "./radial-chart.types";
import {
  PERSIAN_DIGITS,
  DEFAULT_RADIAL_CHART_COLORS,
  RADIAL_CHART_GAP_PERCENT,
} from "./radial-chart.constants";

export function toPersianDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]!);
}

export function formatToman(value: number): string {
  return toPersianDigits(value.toLocaleString("en-US"));
}

export function useRadialChart(data: RadialChartItem[]) {
  // اگه آیتمی رنگ مشخص نکرده باشه، بر اساس ترتیبش رنگ پیش‌فرض می‌گیره
  const resolvedData = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        color:
          item.color ??
          DEFAULT_RADIAL_CHART_COLORS[index % DEFAULT_RADIAL_CHART_COLORS.length]!,
      })),
    [data],
  );

  const chartConfig = useMemo(
    () =>
      resolvedData.reduce((acc, item) => {
        acc[item.key] = { label: item.label, color: item.color };
        return acc;
      }, {} as ChartConfig),
    [resolvedData],
  );

  // یک ردیف واحد که هر آیتم + یه "گپ" بعدش داخلش استک میشه
  const { chartData, stackTotal } = useMemo(() => {
    const singleRow: Record<string, number> = {};
    let total = 0;

    resolvedData.forEach((item, index) => {
      singleRow[item.key] = item.value;
      total += item.value;

      if (index < resolvedData.length - 1) {
        singleRow[`gap${index}`] = RADIAL_CHART_GAP_PERCENT;
        total += RADIAL_CHART_GAP_PERCENT;
      }
    });

    return { chartData: [singleRow], stackTotal: total };
  }, [resolvedData]);

  const reversedData = useMemo(() => [...resolvedData].reverse(), [resolvedData]);

  return { resolvedData, chartConfig, chartData, stackTotal, reversedData };
}
