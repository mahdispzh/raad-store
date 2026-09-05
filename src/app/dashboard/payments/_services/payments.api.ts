// _services/payments.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface PaymentRow {
  id: number;
  order_id: number;
  amount: number;
  payment_method: string;
  status: number;
  transaction_code: string;
  paid_at: string | null;
  created_at: string;
  orders: {
    id: number;
    total_price: number;
  };
}

export interface PaymentsListResponse {
  data: PaymentRow[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface PaymentsFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: number | null;
  paymentMethod?: string;
  minAmount?: number;
  maxAmount?: number;
  fromDate?: string;
  toDate?: string;
}

export interface PaymentsDashboardResponse {
  summary: {
    totalPayments: number;
    successfulPayments: number;
    failedPayments: number;
    pendingPayments: number;
    unspecifiedPayments: number;
    totalIncome: number;
    todayIncome: number;
    averagePayment: number;
    cashPayments: number;
    onlinePayments: number;
    paidToday: number;
    paidThisMonth: number;
  };
  charts: {
    paymentsLast30Days: { date: string; count: number }[];
    incomeLast30Days: { date: string; income: number }[];
    monthlyIncome: { month: string; income: number }[];
    monthlyPayments: { month: string; count: number }[];
  };
}

// فیلترهای معتبر رو به query string تبدیل می‌کنه (فیلدهای خالی/undefined نادیده گرفته می‌شن)
function buildQuery(filters: PaymentsFilters): string {
  const params = new URLSearchParams();
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.search?.trim()) params.set("search", filters.search.trim());
  if (filters.status != null) params.set("status", String(filters.status));
  if (filters.paymentMethod) params.set("paymentMethod", filters.paymentMethod);
  if (filters.minAmount != null) params.set("minAmount", String(filters.minAmount));
  if (filters.maxAmount != null) params.set("maxAmount", String(filters.maxAmount));
  if (filters.fromDate) params.set("fromDate", filters.fromDate);
  if (filters.toDate) params.set("toDate", filters.toDate);
  return params.toString();
}

export const getPayments = async (filters: PaymentsFilters = {}) => {
  const query = buildQuery(filters);
  return fetcher<PaymentsListResponse>(() =>
    apiClient.get(`protected/payments${query ? `?${query}` : ""}`),
  );
};

export const getPaymentsDashboard = async () => {
  return fetcher<PaymentsDashboardResponse>(() =>
    apiClient.get("protected/admin-overview/payments"),
  );
};