// _services/dashboard-stats.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

/** دقیقاً منطبق با خروجی src/app/api/protected/admin-overview/orders/_lib/summary.ts */
export interface OrdersSummary {
  totalOrders: number;

  todayOrders: number;
  yesterdayOrders: number;
  thisWeekOrders: number;
  thisMonthOrders: number;

  pendingOrders: number;
  confirmedOrders: number;
  preparingOrders: number;
  readyToShipOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  returnedOrders: number;

  paidOrders: number;
  unpaidOrders: number;
  // ✅ payment_status چهار حالته (۰=در انتظار، ۱=موفق، ۲=ناموفق، ۳=نامشخص)؛
  // بک‌اند (summary.ts) این دو فیلد رو برمی‌گردونه ولی این تایپ عقب مونده بود
  failedPaymentOrders: number;
  unspecifiedPaymentOrders: number;

  totalRevenue: number;
  todayRevenue: number;
  yesterdayRevenue: number;
  averageOrderValue: number;

  lastMonthOrders: number;
  thisMonthAverageOrderValue: number;
  lastMonthAverageOrderValue: number;

  lastWeekOrders: number;
  thisWeekPaidOrders: number;
  lastWeekPaidOrders: number;
}

export interface OrdersTopCustomer {
  id: number;
  name: string | null;
  phone: string | null;
  _count: { orders: number };
}

export interface OrdersLatestOrder {
  id: number;
  created_at: string | null;
  total_price: number | null;
  status: number;
  users?: { name?: string | null; phone?: string | null } | null;
  // ✅ برای عکس اولین آیتم خریداری‌شده در "برترین سفارش‌ها"
  order_items?: {
    products?: { images?: string[] | null } | null;
  }[];
}

export interface OrdersReport {
  latestOrders: OrdersLatestOrder[];
  topCustomers: OrdersTopCustomer[];
  /** ۱۰ سفارش با بیشترین مبلغ — همون شکل latestOrders رو داره */
  highestValueOrders: OrdersLatestOrder[];
  // بقیه‌ی فیلدهای report (returnedOrders, pendingOrders, ...) فعلاً تو overview استفاده نمی‌شن
  [key: string]: unknown;
}

export interface ChartPoint2D {
  name: string;
  value: number;
}

/** یک ستون نمودار میله‌ای/خطی: { day: لیبل, value: مقدار (تومان) } */
export interface DayValuePoint {
  day: string;
  value: number;
}

export interface DailyCountPoint {
  date: string;
  count: number;
}

export interface DailyRevenuePoint {
  date: string;
  revenue: number;
}

/** دقیقاً منطبق با خروجی src/app/api/protected/admin-overview/orders/_lib/chart.ts */
export interface OrdersCharts {
  ordersLast30Days: DailyCountPoint[];
  revenueLast30Days: DailyRevenuePoint[];
  paymentStatusChart: ChartPoint2D[];
  orderStatusChart: ChartPoint2D[];
  monthlyRevenue: { month: string; value: number }[];
  monthlyOrders: { month: string; value: number }[];

  /** درآمد امروز به تفکیک بازه‌های ۴ ساعته */
  dailyRevenueChart: DayValuePoint[];
  /** درصد رشد درآمد امروز نسبت به دیروز */
  dailyRevenueGrowth: number;

  /** درآمد ۷ روز اخیر به تفکیک روز هفته (شنبه..جمعه) — واحد: تومان */
  weeklyRevenueChart: DayValuePoint[];
  /** درصد رشد درآمد این هفته نسبت به هفته قبل */
  weeklyRevenueGrowth: number;

  topCustomersChart: { name: string; orders: number }[];
}

export interface OrdersOverviewResponse {
  summary: OrdersSummary;
  report: OrdersReport;
  charts: OrdersCharts;
}

/** روز به روزِ درآمد یک ماه شمسی مشخص — برای LineChart با dropdown ماه */
export interface MonthlyRevenueDayPoint {
  day: number;
  revenue: number;
}

export interface OrderMonthlyRevenueResponse {
  daysInMonth: number;
  revenueByDay: MonthlyRevenueDayPoint[];
}

export interface PaymentsSummary {
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
}

export interface ProductsSummary {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  discountedProducts: number;
  noDiscountProducts: number;
  totalVariants: number;
  totalStock: number;
  outOfStockVariants: number;
  lowStockVariants: number;
  criticalStockVariants: number;
}

/** فقط summary — برای جاهایی که همین‌قدر کافیه (مثلاً کارت‌های خلاصه‌ی سبک) */
export const getOrdersSummary = async () => {
  const res = await fetcher<{ summary: OrdersSummary }>(() =>
    apiClient.get("protected/admin-overview/orders"),
  );
  return res.summary;
};

/** summary + report + charts — برای صفحه‌ی overview کامل سفارش‌ها */
export const getOrdersOverview = async (): Promise<OrdersOverviewResponse> => {
  return fetcher<OrdersOverviewResponse>(() =>
    apiClient.get("protected/admin-overview/orders"),
  );
};

/** درآمد روزانه‌ی یک ماه شمسی مشخص — برای LineChart با dropdown ماه در صفحه‌ی سفارش‌ها */
export const getOrderMonthlyRevenue = async (
  year: number,
  month: number,
): Promise<OrderMonthlyRevenueResponse> => {
  return fetcher<OrderMonthlyRevenueResponse>(() =>
    apiClient.get(
      `protected/admin-overview/orders/monthly-revenue?year=${year}&month=${month}`,
    ),
  );
};

export const getPaymentsSummary = async () => {
  const res = await fetcher<{ summary: PaymentsSummary }>(() =>
    apiClient.get("protected/admin-overview/payments"),
  );
  return res.summary;
};

export const getProductsSummary = async () => {
  const res = await fetcher<{ summary: ProductsSummary }>(() =>
    apiClient.get("protected/admin-overview/products"),
  );
  return res.summary;
};