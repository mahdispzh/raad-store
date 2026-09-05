// use-admin-stats.ts
import { useEffect, useState } from "react";
import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { useAuthStore } from "../../store/store";
import { IconKeys } from "./profile-modal.types";

export interface AdminDisplayStat {
  id: number;
  label: string;
  value: number;
  percent: string | null; // مثلا "10%" یا null اگه دیروز صفر بوده یا داده در دسترس نبود
  isPositive: boolean;
  iconKey: IconKeys;
}

interface AdminOverviewUsersResponse {
  summary: {
    todayUsers: number;
    yesterdayUsers: number;
  };
}

interface AdminOverviewOrdersResponse {
  summary: {
    todayOrders: number;
    yesterdayOrders: number;
    pendingOrders: number;
  };
}

const calcPercent = (today: number, yesterday: number): number => {
  if (yesterday === 0) {
    return today === 0 ? 0 : 100;
  }
  return Math.round(((today - yesterday) / yesterday) * 100);
};

export const useAdminStats = (enabled: boolean) => {
  const [stats, setStats] = useState<AdminDisplayStat[] | null>(null);
  const [loading, setLoading] = useState(false);
  // برای re-fetch شدن وقتی توکن آماده/عوض می‌شه نگه داشته شده
  const token = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const [usersJson, ordersJson] = await Promise.all([
          fetcher<AdminOverviewUsersResponse>(() =>
            apiClient.get("protected/admin-overview/users"),
          ),
          fetcher<AdminOverviewOrdersResponse>(() =>
            apiClient.get("protected/admin-overview/orders"),
          ),
        ]);

        const { todayUsers, yesterdayUsers } = usersJson.summary;
        const { todayOrders, yesterdayOrders, pendingOrders } =
          ordersJson.summary;

        const usersPercent = calcPercent(todayUsers, yesterdayUsers);
        const ordersPercent = calcPercent(todayOrders, yesterdayOrders);

        if (cancelled) return;

        setStats([
          {
            id: 1,
            label: "کاربر جدید",
            value: todayUsers,
            percent: `${Math.abs(usersPercent)}%`,
            isPositive: usersPercent >= 0,
            iconKey: "Users",
          },
          {
            id: 2,
            label: "سفارشات امروز",
            value: todayOrders,
            percent: `${Math.abs(ordersPercent)}%`,
            isPositive: ordersPercent >= 0,
            iconKey: "Bag",
          },
          {
            id: 3,
            // pendingOrders یک شمارش لحظه‌ای است (نه رویداد امروز)،
            // پس مقایسه با دیروز معنی ندارد و درصد نداریم
            label: "در انتظار تایید",
            value: pendingOrders,
            percent: null,
            isPositive: true,
            iconKey: "Clock",
          },
        ]);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [enabled, token]);

  return { stats, loading };
};