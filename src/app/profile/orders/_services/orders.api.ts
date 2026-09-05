// src/app/profile/orders/_services/orders.api.ts

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import type {
  OrderAPI,
  OrdersResponse,
  OrderStatusCounts,
} from "../_types/order.types";

/**
 * دریافت لیست سفارش‌های من با صفحه‌بندی
 * GET protected/orders/me
 */
export const getOrders = async (
  page: number = 1,
  limit: number = 10,
): Promise<OrdersResponse> => {
  return fetcher<OrdersResponse>(() =>
    apiClient.get(`protected/orders/me?page=${page}&limit=${limit}`),
  );
};

/**
 * دریافت یک سفارش با ID
 * GET protected/orders/:orderId
 */
export const getOrderById = async (orderId: number): Promise<OrderAPI> => {
  return fetcher<OrderAPI>(() =>
    apiClient.get(`protected/orders/${orderId}`),
  );
};

/**
 * دریافت تمام سفارش‌ها (با یک بار درخواست)
 * برای محاسبه تعداد و فیلتر کردن سمت کلاینت
 */
export const getAllOrders = async (): Promise<OrderAPI[]> => {
  const result = await getOrders(1, 1000);
  return result.data;
};

/**
 * دریافت تعداد سفارش‌ها بر اساس وضعیت
 */
export const getOrderStatusCounts = async (): Promise<OrderStatusCounts> => {
  const orders = await getAllOrders();

  const counts: OrderStatusCounts = {
    current: 0, // status 1,2,3,4,5
    delivered: 0, // status 6
    returned: 0, // status 7
  };

  orders.forEach((order) => {
    if (order.status >= 1 && order.status <= 5) {
      counts.current++;
    } else if (order.status === 6) {
      counts.delivered++;
    } else if (order.status === 7) {
      counts.returned++;
    }
  });

  return counts;
};

// فیلتر و صفحه‌بندی سمت کلاینت روی لیست کامل سفارش‌ها
function paginateFiltered(
  allOrders: OrderAPI[],
  predicate: (order: OrderAPI) => boolean,
  page: number,
  limit: number,
): OrdersResponse {
  const filtered = allOrders.filter(predicate);
  const total = filtered.length;

  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      hasMore: end < total,
    },
  };
}

/**
 * دریافت سفارش‌های جاری (status 1,2,3,4,5) — فیلتر سمت کلاینت
 */
export const getCurrentOrders = async (
  page: number = 1,
  limit: number = 10,
): Promise<OrdersResponse> => {
  const allOrders = await getAllOrders();
  return paginateFiltered(
    allOrders,
    (order) => order.status >= 1 && order.status <= 5,
    page,
    limit,
  );
};

/**
 * دریافت سفارش‌های تحویل شده (status 6) — فیلتر سمت کلاینت
 */
export const getDeliveredOrders = async (
  page: number = 1,
  limit: number = 10,
): Promise<OrdersResponse> => {
  const allOrders = await getAllOrders();
  return paginateFiltered(
    allOrders,
    (order) => order.status === 6,
    page,
    limit,
  );
};

/**
 * دریافت سفارش‌های مرجوع شده (status 7) — فیلتر سمت کلاینت
 */
export const getReturnedOrders = async (
  page: number = 1,
  limit: number = 10,
): Promise<OrdersResponse> => {
  const allOrders = await getAllOrders();
  return paginateFiltered(
    allOrders,
    (order) => order.status === 7,
    page,
    limit,
  );
};

/**
 * ایجاد سفارش جدید
 * POST protected/orders/me
 */
export const createOrder = async (data: {
  cartId?: number;
  addressId: number;
  totalPrice: number;
  items: Array<{
    productId: number;
    variantId?: number;
    price: number;
    quantity: number;
  }>;
}): Promise<OrderAPI> => {
  return fetcher<OrderAPI>(() =>
    apiClient.post("protected/orders/me", {
      cartId: data.cartId,
      addressId: data.addressId,
      totalPrice: data.totalPrice,
      items: data.items,
    }),
  );
};

/**
 * بروزرسانی وضعیت سفارش
 * PUT protected/orders/:orderId
 */
export const updateOrderStatus = async (
  orderId: number,
  status: number,
  paymentStatus?: number,
): Promise<OrderAPI> => {
  return fetcher<OrderAPI>(() =>
    apiClient.put(`protected/orders/${orderId}`, {
      status,
      paymentStatus,
    }),
  );
};

// شیء سازگاری با importهای قدیمی (orderService.xxx)؛ اگه دیگه جایی صداش
// نمی‌زنه، می‌تونی این export رو حذف کنی.
export const orderService = {
  getOrders,
  getOrderById,
  getAllOrders,
  getOrderStatusCounts,
  getCurrentOrders,
  getDeliveredOrders,
  getReturnedOrders,
  createOrder,
  updateOrderStatus,
};