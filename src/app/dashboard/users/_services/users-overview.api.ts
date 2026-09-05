import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export type UsersOverviewResponse = {
  summary: {
    totalUsers: number;
    todayUsers: number;
    yesterdayUsers: number;
    thisMonthUsers: number;
    lastMonthUsers: number;
    usersWithOrders: number;
    usersWithAddress: number;
    // درصد رشد/افت هر متریک نسبت به دوره‌ی قبل از خودش (روز قبل یا ماه قبل، بسته به نوع دیتا)
    todayGrowthPercent: number;
    monthGrowthPercent: number;
    ordersGrowthPercent: number;
    addressGrowthPercent: number;
    // ... سایر فیلدها
  };
  report: {
    topCustomers: {
      id: number;
      name: string | null;
      phone: string | null;
      _count: { orders: number };
    }[];
  newestUsers: {
  id: number;
  name: string | null;
  phone: string | null;
  created_at: string | null;
  image_id: number; // ✅ اضافه بشه
}[];
  };
  charts: {
    usersLast30Days: { date: string; count: number }[];
    registrationsByMonth: { month: string; count: number }[];
    usersOrderDistribution: { name: string; value: number }[];
  };
};

export const getUsersOverview = () => {
  return fetcher<UsersOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/users")
  );
};

export type UsersMonthlyChartResponse = {
  countByDay: { day: number; value: number }[];
  daysInMonth: number;
};

export const getUsersMonthlyChart = (jy: number, jm: number) => {
  return fetcher<UsersMonthlyChartResponse>(() =>
    apiClient.get("/protected/admin-overview/users/monthly", {
      params: { year: jy, month: jm },
    })
  );
};