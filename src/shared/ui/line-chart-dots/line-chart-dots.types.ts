// _components/types.ts
export const PERIOD_OPTIONS = ["ماهانه", "هفتگی", "روزانه"] as const;
export type Period = (typeof PERIOD_OPTIONS)[number];

export interface TooltipItem {
  dataKey: string;
  value: number;
  color: string;
}

export interface ChartDatum {
  date: string;
  income: number;
  count: number;
}

export interface ChartDataProps {
  data: PaymentsDashboardResponse | undefined;
  isLoading?: boolean;
  title?: string;
  showLegend?: boolean;
  height?: number;
  className?: string;
}
export interface PaymentsDashboardResponse {
  charts: {
    paymentsLast30Days: {
      date: string;
      count: number;
    }[];

    incomeLast30Days: {
      date: string;
      income: number;
    }[];

    monthlyIncome: {
      month: string;
      income: number;
    }[];

    monthlyPayments: {
      month: string;
      count: number;
    }[];
  };
}