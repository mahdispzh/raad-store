import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface PaymentsOverviewSummary {
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  unspecifiedPayments: number;

  cashPayments: number;
  onlinePayments: number;

  totalIncome: number;
  todayIncome: number;
  averagePayment: number;
  averageDailyIncome: number;
  paidToday: number;
  paidThisMonth: number;
  totalPayments: number;

  monthlyIncomeGrowth: number;
  todayIncomeGrowth: number;
  averageDailyIncomeGrowth: number;
  totalPaymentsGrowth: number;
  successfulPaymentsGrowth: number;
}

export interface PaymentsOverviewCharts {
  paymentsLast30Days: { date: string; count: number }[];
  incomeLast30Days: { date: string; income: number }[];
  paymentStatusChart: { name: string; value: number }[];
  paymentMethodChart: { name: string; value: number }[];
  monthlyIncome: { month: string; income: number }[];
  monthlyPayments: { month: string; count: number }[];
  biggestPaymentsChart: { name: string; amount: number }[];
  weeklyIncomeChart: { day: string; value: number }[];
  weeklyIncomeGrowth: number;
  dailyIncomeChart: { day: string; value: number }[];
  dailyIncomeGrowth: number;
  // ✅ جدید — درآمد روز‌به‌روزِ ماه شمسیِ درخواست‌شده (برای LineChart)
  incomeByDay: { day: number; value: number }[] | null;
  daysInMonth: number | null;
}

export interface PaymentsOverviewResponse {
  summary: PaymentsOverviewSummary;
  report: any;
  charts: PaymentsOverviewCharts;
}

// ✅ jy/jm اختیاری — وقتی پاس داده بشن، بک‌اند incomeByDay رو دقیقاً برای
// همون ماه شمسی برمی‌گردونه (برای سلکتور ماهِ LineChart)
export const getPaymentsOverview = (jy?: number, jm?: number) => {
  const query = jy && jm ? `?year=${jy}&month=${jm}` : "";
  return fetcher<PaymentsOverviewResponse>(() =>
    apiClient.get(`/protected/admin-overview/payments${query}`),
  );
};