import type { ReactNode } from "react";

export type MonthlyPoint = {
  day: number;
  value: number;
};

export type ChartPoint = MonthlyPoint & {
  x: number;
  y: number;
};

export type AxisLabel = {
  key: number;
  x: number;
  y: number;
  text: string;
  textAnchor?: "start" | "middle" | "end"; // ✅ اضافه شد
};

export type GridLine = {
  key: number;
  x1: number;
  x2: number;
  y: number;
};

export type TooltipBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  bottom: number;
  dayText: string;
  valueText: string;
};
export type LineChartProps = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  data: MonthlyPoint[];
  monthName?: string | undefined;
  valueSuffix: string;   // ⬅️ اجباری شد، دیگه مقدار ثابت پیش‌فرض نداره
  onMonthChange?: ((monthName: string) => void) | undefined;
  // ✅ با exactOptionalPropertyTypes:true باید صریحاً "| undefined" هم اضافه شه،
  // چون page.tsx مقدار daysInMonth={possiblyUndefinedNumber} پاس می‌ده
  daysInMonth?: number | undefined;
  axisTitle: string;     // ⬅️ اجباری
  metricLabel: string;   // ⬅️ اجباری
};