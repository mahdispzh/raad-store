// src/app/profile/payment/_hooks/usePaymentProcess.ts

"use client";

import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { paymentService } from "../_services/payment.api";

interface PaymentProcessParams {
  orderId: number;
  sendingMethod: "regular" | "express";
}

export function usePaymentProcess() {
  const processPayment = useCallback(async (params: PaymentProcessParams) => {
    try {
      const result = await paymentService.createZarinpalPayment({
        orderId: params.orderId,
        sendingMethod: params.sendingMethod,
      });

      if (!result?.link) {
        throw new Error("لینک درگاه پرداخت دریافت نشد");
      }

      return { success: true, paymentUrl: result.link };
    } catch (error: any) {
      console.error("❌ خطا در ایجاد تراکنش پرداخت:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        raw: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      });

      toast.error(
        error?.response?.data?.message ||
          (error instanceof Error ? error.message : "خطا در اتصال به درگاه پرداخت"),
      );

      return {
        success: false,
        error: error?.response?.data?.message || (error instanceof Error ? error.message : "خطای ناشناخته"),
      };
    }
  }, []);

  return { processPayment };
}