// src/app/profile/orders/_types/order.types.ts

import { GatewayType } from "./common.types";

export interface OrderItem {
  productId: number;
  variantId: number;
  quantity: number;
  price?: number;
  product?: {
    id: number;
    name: string;
    images?: string[];
  };
}

export interface CreateOrderData {
  cartId: number;
  addressId: number;
  totalPrice: number;
  shippingMethod: "regular" | "express";
  paymentMethod: "zarinpal"; // ⬅️ قبلاً "pasargad" | "saman"
  discountCode?: string;
  items: OrderItem[];
}
export interface Order {
  id: number;
  user_id: number;
  cart_id: number | null;
  address_id: number;
  total_price: number;
  status: number;
  payment_status: number;
  order_items: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderResponse {
  data: Order[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface CreateOrderResponse {
  data: Order;
  message: string;
  // ✅ order.api.ts گاهی این فیلد را برمی‌گرداند؛ اختیاری است تا با پاسخ‌های
  // بدون status هم سازگار بماند
  status?: string;
  paymentUrl?: string;
  paymentLink?: string;
  redirectUrl?: string;
}