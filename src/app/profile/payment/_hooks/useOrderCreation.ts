// src/app/profile/payment/_hooks/useOrderCreation.ts

"use client";

import { useCallback } from "react";
import { CreateOrderData } from "../_types/order.types";
import { useCreateOrder } from "./useOrders";
interface OrderCreationParams {
  cartId: number;
  addressId: number;
  totalPrice: number;
  shippingMethod: "regular" | "express";
  paymentMethod: "zarinpal"; // ⬅️ قبلاً "pasargad" | "saman" بود
  discountCode?: string | null;
  items: Array<{
    productId: number;
    variantId: number;
    quantity: number;
    price: number;
  }>;
}

export function useOrderCreation() {
  const createOrderMutation = useCreateOrder();

  const createOrder = useCallback(
    async (params: OrderCreationParams) => {
      // ✅ اعتبارسنجی
      if (!params.addressId) {
        console.error("❌ آدرس تحویل انتخاب نشده است");
        return null;
      }

      if (!params.items || params.items.length === 0) {
        console.error("❌ سبد خرید خالی است");
        return null;
      }

      if (!params.cartId) {
        console.error("❌ شناسه سبد خرید یافت نشد");
        return null;
      }

      try {
        const orderData: CreateOrderData = {
          cartId: params.cartId,
          addressId: params.addressId,
          totalPrice: params.totalPrice,
          shippingMethod: params.shippingMethod,
          paymentMethod: params.paymentMethod,
          items: params.items,
        };

        // ✅ فقط اگر discountCode وجود داشت و خالی نبود، اضافه کن
        if (params.discountCode && params.discountCode.trim()) {
          orderData.discountCode = params.discountCode.trim();
        }

        console.log("📦 داده‌های سفارش:", orderData);

        const result = await createOrderMutation.mutateAsync(orderData);

        // ✅ استخراج Order از پاسخ
        const order = result?.data || result;

        if (!order?.id) {
          throw new Error("شناسه سفارش دریافت نشد");
        }

        console.log("✅ سفارش با موفقیت ثبت شد:", order);
        return order;
      } catch (error) {
        console.error("❌ خطا در ایجاد سفارش:", error);
        return null;
      }
    },
    [createOrderMutation],
  );

  return {
    createOrder,
    isLoading: createOrderMutation.isPending,
    error: createOrderMutation.error,
  };
}
