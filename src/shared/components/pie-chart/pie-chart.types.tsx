import type { ReactNode } from "react";

export interface PieChartItem {
  key: string;
  label: string;
  value: number;
  color?: string | undefined;
}

export interface PieChartProps {
  icon: ReactNode;
  title: string;
  data: PieChartItem[];
  unit?: string | undefined;
}
