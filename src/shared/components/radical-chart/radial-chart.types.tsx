import type { ReactNode } from "react";

export interface RadialChartItem {
  key: string;
  label: string;
  // سهم از کل — همینه که حلقه رو تقسیم می‌کنه
  value: number;
  // عدد پایینِ legend — مستقل از تقسیم‌بندی حلقه
  unitsSold: number;
  color?: string | undefined;
}

export interface RadialChartProps {
  icon: ReactNode;
  title: string;
  // بج گوشه‌ی بالا سمت چپ (مثلاً اسم ماه)
  periodLabel: string;
  data: RadialChartItem[];
  // عدد وسط حلقه
  centerValue: number;
  centerUnit?: string | undefined;
}
