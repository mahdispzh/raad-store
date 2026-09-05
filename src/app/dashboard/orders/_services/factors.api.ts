// _services/factors.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { RawOrder, RawOrdersResponse } from "../_types/factors.types";

// شکل دقیق پاسخ /orders/report مشخص نبود؛ اگه تایپ دقیق‌تری داری جایگزینش کن
export interface OrdersReportRaw {
  [key: string]: unknown;
}

export const getAdminOrders = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search.trim()) params.append("search", search);

  return fetcher<RawOrdersResponse>(() =>
    apiClient.get(`protected/orders/admin?${params.toString()}`),
  );
};

export const getOrder = async (orderId: number | string) => {
  return fetcher<RawOrder>(() =>
    apiClient.get(`protected/orders/${orderId}`),
  );
};

export const updateOrderStatus = async (
  orderId: number,
  data: { status?: number; paymentStatus?: number },
) => {
  return fetcher<RawOrder>(() =>
    apiClient.put(`protected/orders/${orderId}`, data),
  );
};

export const getDashboardStats = async () => {
  return fetcher<OrdersReportRaw>(() =>
    apiClient.get("protected/orders/report"),
  );
};