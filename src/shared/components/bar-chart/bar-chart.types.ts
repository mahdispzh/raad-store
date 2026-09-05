import type { ReactNode } from "react";

export type DayReport = {
  day: string;
  value: number;
};

export type BarChartItem = DayReport & {
  delay: number;
  active: boolean;
  height: number;
};

export type BarChartProps = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  data: DayReport[];
  valueSuffix?: string; // ✅ اضافه شد — پیش‌فرض نداره چون context متفاوته
};