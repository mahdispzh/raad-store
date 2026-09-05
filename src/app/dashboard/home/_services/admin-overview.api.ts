import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface AdminOverviewSummary {
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

// ✅ جدید — پرفروش‌ترین محصولات یک ماه شمسی خاص (بر اساس فروش واقعی)
export interface TopSellingMonthlyItem {
  id: number;
  name: string;
  image: string;
  count: number;
}

export interface TopSellingMonthlyResult {
  jalaaliYear: number;
  jalaaliMonth: number;
  items: TopSellingMonthlyItem[];
}

export interface AdminOverviewResponse {
  summary: AdminOverviewSummary;
  report: any;
  charts: any;
  topSellingMonthly: TopSellingMonthlyResult | null;
}

export interface CategoriesOverviewSummary {
  totalCategories: number;
  rootCategories: number;
  childCategories: number;
  categoriesWithProducts: number;
  emptyCategories: number;
  totalProducts: number;
  averageProductsPerCategory: number;
}

export interface CategoriesOverviewCharts {
  categoriesLast30Days: { date: string; count: number }[];
  monthlyCategories: { month: string; count: number }[];
  topCategoriesChart: { name: string; products: number }[];
  categoryDistributionChart: { name: string; value: number }[];
  parentChildChart: { name: string; value: number }[];
}

export interface CategoriesOverviewResponse {
  summary: CategoriesOverviewSummary;
  report: any;
  charts: CategoriesOverviewCharts;
}

// ✅ جدید
export interface OrdersOverviewSummary {
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
  paidToday: number;
  paidThisMonth: number;
  totalPayments: number;
}

export interface PaymentsOverviewCharts {
  weeklyIncomeChart: { day: string; value: number }[];
  weeklyIncomeGrowth: number;
  // بقیه فیلدهای charts هم اینجا اضافه کنید اگه لازمشون داشتید
}
export interface OrdersOverviewCharts {
  revenueLast30Days: { date: string; revenue: number }[];
  ordersLast30Days: { date: string; count: number }[];
  orderStatusChart: { name: string; value: number }[];
  paymentStatusChart: { name: string; value: number }[];
  monthlyRevenue: { month: string; revenue: number }[];
  monthlyOrders: { month: string; count: number }[];
  topCustomersChart: { name: string; orders: number }[];
}
export interface PaymentsOverviewResponse {
  summary: PaymentsOverviewSummary;
  report: any;
  charts: PaymentsOverviewCharts;
}

export const getPaymentsOverview = () => {
  return fetcher<PaymentsOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/payments"),
  );
};
// ✅ جدید
export interface OrdersOverviewResponse {
  summary: OrdersOverviewSummary;
  report: any;
  charts: OrdersOverviewCharts;
}

// ✅ جدید — year/month اختیاری؛ اگه پاس داده بشن، topSellingMonthly هم تو پاسخ پر می‌شه
export const getAdminOverview = (
  jalaaliYear?: number,
  jalaaliMonth?: number,
) => {
  return fetcher<AdminOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/products", {
      params:
        jalaaliYear !== undefined && jalaaliMonth !== undefined
          ? { year: jalaaliYear, month: jalaaliMonth }
          : undefined,
    }),
  );
};

export const getCategoriesOverview = () => {
  return fetcher<CategoriesOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/categories"),
  );
};

// ✅ جدید
export const getOrdersOverview = () => {
  return fetcher<OrdersOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/orders"),
  );
};
export interface UsersOverviewSummary {
  totalUsers: number;
  todayUsers: number;
  yesterdayUsers: number;
  thisWeekUsers: number;
  thisMonthUsers: number;
  lastMonthUsers: number;
  totalAdmins: number;
  totalCustomers: number;
  usersWithOrders: number;
  usersWithoutOrdersCount: number;
  usersWithAddress: number;
  usersWithoutAddressCount: number;
  usersWithRecentlyViewed: number;
  usersWithRecentlySearch: number;
}

export interface UsersOverviewResponse {
  summary: UsersOverviewSummary;
  report: any;
  charts: any;
}

export const getUsersOverview = () => {
  return fetcher<UsersOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/users"),
  );
};
export interface MonthlyRevenueByDay {
  day: number;
  revenue: number;
}

export interface MonthlyRevenueResponse {
  jalaaliYear: number;
  jalaaliMonth: number;
  daysInMonth: number;
  revenueByDay: MonthlyRevenueByDay[];
}

export const getMonthlyRevenue = (
  jalaaliYear: number,
  jalaaliMonth: number,
) => {
  return fetcher<MonthlyRevenueResponse>(() =>
    apiClient.get("/protected/admin-overview/orders/monthly", { // ← این خط، بدون "-revenue"
      params: { year: jalaaliYear, month: jalaaliMonth },
    }),
  );
};
// ✅ جدید — خلاصه/گزارش تنوع‌های محصولات (Product Variants)
export interface VariantsOverviewSummary {
  totalVariants: number;
  totalStock: number;
  outOfStock: number;
  criticalStock: number;
  lowStock: number;
  normalStock: number;
  averageStock: number;
  uniqueProducts: number;
  uniqueColors: number;
  uniqueSizes: number;
}

export interface VariantsOverviewResponse {
  summary: VariantsOverviewSummary;
  report: any;
  charts: any;
}

export const getVariantsOverview = () => {
  return fetcher<VariantsOverviewResponse>(() =>
  apiClient.get("/protected/admin-overview/inventory"),
  );
};