// src/app/profile/payments/_services/payment.api.ts

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import type { Payment, PaymentFilters, PaymentsResponse } from "../_types/payment.types";

const buildQueryParams = (filters: PaymentFilters): string => {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.status !== undefined && filters.status !== null) {
    params.append("status", filters.status.toString());
  }
  if (filters.paymentMethod) params.append("paymentMethod", filters.paymentMethod);
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

  return params.toString();
};

// دریافت همه پرداخت‌ها (ادمین)
export const getAllPayments = async (
  filters: PaymentFilters = {},
): Promise<PaymentsResponse> => {
  const queryString = buildQueryParams(filters);
  return fetcher<PaymentsResponse>(() =>
    apiClient.get(`protected/payments?${queryString}`),
  );
};

// دریافت پرداخت‌های کاربر جاری
export const getUserPayments = async (
  filters: PaymentFilters = {},
): Promise<PaymentsResponse> => {
  const queryString = buildQueryParams(filters);
  return fetcher<PaymentsResponse>(() =>
    apiClient.get(`protected/user/payments?${queryString}`),
  );
};

// دریافت یک پرداخت با آیدی
export const getPaymentById = async (paymentId: number): Promise<Payment> => {
  return fetcher<Payment>(() => apiClient.get(`protected/payments/${paymentId}`));
};

// ایجاد پرداخت جدید
export const createPayment = async (data: {
  orderId: number;
  amount: number;
  paymentMethod: string;
  status: number;
  transactionCode?: string;
  paidAt?: string | null;
}): Promise<Payment> => {
  return fetcher<Payment>(() =>
    apiClient.post("protected/payments", {
      orderId: Number(data.orderId),
      amount: Number(data.amount),
      paymentMethod: data.paymentMethod,
      status: Number(data.status),
      transactionCode: data.transactionCode || `PAY-${data.orderId}-${Date.now()}`,
      paidAt: data.paidAt || null,
    }),
  );
};

// آپدیت پرداخت
// نکته: فقط فیلدهایی که واقعاً پاس داده شدن به بک‌اند فرستاده می‌شن، چون
// فرستادن transactionCode/paidAt به‌صورت null صریح باعث خطای NOT NULL می‌شد.
export const updatePayment = async (
  paymentId: number,
  data: { status: number; transactionCode?: string; paidAt?: string },
): Promise<Payment> => {
  const payload: Record<string, any> = {
    status: Number(data.status),
  };
  if (data.transactionCode !== undefined) payload.transactionCode = data.transactionCode;
  if (data.paidAt !== undefined) payload.paidAt = data.paidAt;

  return fetcher<Payment>(() => apiClient.put(`protected/payments/${paymentId}`, payload));
};

// حذف پرداخت (ادمین)
export const deletePayment = async (
  paymentId: number,
): Promise<{ success: boolean }> => {
  return fetcher<{ success: boolean }>(() =>
    apiClient.delete(`protected/payments/${paymentId}`),
  );
};
// اضافه به انتهای payment.api.ts موجود

// ساخت تراکنش پرداخت زرین‌پال و گرفتن لینک درگاه
export const createZarinpalPayment = async (data: {
  orderId: number;
  sendingMethod: "regular" | "express";
}): Promise<{ link: string }> => {
  return fetcher<{ link: string }>(() =>
    apiClient.post("protected/payments/pay-request", {
      orderId: data.orderId,
      sendingMethod: data.sendingMethod,
    }, { timeout: 30000 }), // ⬅️ اضافه شد
  );
};

// اعتبارسنجی تراکنش بعد از برگشت از زرین‌پال
export const verifyZarinpalPayment = async (data: {
  authority: string;
  status: "OK" | "NOK";
}): Promise<{
  code: number;
  ref_id?: number;
  card_pan?: string;
  message?: string;
    sending_method?: string; // ⬅️ اضافه شد

}> => {
  return fetcher(() =>
    apiClient.post("protected/payments/pay-verify", data),
  );
};
// سازگاری با importهای قدیمی (paymentService.xxx)
export const paymentService = {
  getAllPayments,
  getUserPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
    createZarinpalPayment,   // ✅ جدید
  verifyZarinpalPayment,
};

// ============================================
// تایپ‌های کمکی برای استفاده در کامپوننت‌ها
// ============================================

export type PaymentStatus = "pending" | "paid" | "failed" | "cancelled";

export const PaymentStatusMap: Record<PaymentStatus, number> = {
  pending: 1,
  paid: 2,
  failed: 3,
  cancelled: 4,
};

export const getPaymentStatusText = (status: number): string => {
  switch (status) {
    case 1: return "در انتظار پرداخت";
    case 2: return "پرداخت شده";
    case 3: return "ناموفق";
    case 4: return "لغو شده";
    default: return "نامشخص";
  }
};

export const getPaymentStatusColor = (status: number): string => {
  switch (status) {
    case 1: return "text-yellow-600 bg-yellow-50";
    case 2: return "text-green-600 bg-green-50";
    case 3: return "text-red-600 bg-red-50";
    case 4: return "text-gray-600 bg-gray-50";
    default: return "text-gray-600 bg-gray-50";
  }
};
