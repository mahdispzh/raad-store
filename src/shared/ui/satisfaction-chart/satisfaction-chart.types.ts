export interface SatisfactionItem {
  name: string;
  value: number;
  percent: string;
}

export interface SatisfactionChartProps {
  title?: string;
  total?: string;
  fromTotal?: string;
  fromTotalValue?: number;
  data: SatisfactionItem[];
  className?: string;
  chartPercentage?: number;
}
