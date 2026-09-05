// src/app/profile/payment/_services/order.api.ts
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../../orders/_services/orders.api";
import type { CreateOrderData, CreateOrderResponse } from "../_types/order.types";

export { createOrder, getOrders };

// معادل امضای قدیمی: updateOrder(orderId, { status?, paymentStatus? })
export const updateOrder = async (
  orderId: number,
  data: { status?: number; paymentStatus?: number },
) => {
  return updateOrderStatus(orderId, data.status as number, data.paymentStatus);
};

export const orderService = {
  createOrder: async (data: CreateOrderData): Promise<CreateOrderResponse> => {
    const order = await createOrder(data as any);
    return {
      data: order as unknown as CreateOrderResponse["data"],
      message: "سفارش با موفقیت ایجاد شد",
      status: "success",
    };
  },
  updateOrder,
  getOrders,
};