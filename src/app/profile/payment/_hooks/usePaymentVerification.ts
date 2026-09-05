// src/app/profile/payment/_hooks/usePaymentVerification.ts

"use client";

import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { paymentService } from "../_services/payment.api";

interface VerificationResult {
  status: "success" | "unsuccess" | "unknown" | "bank-error";
  refId?: number | undefined;
  cardPan?: string | undefined;
  message?: string | undefined;
    sendingMethod?: string | undefined; // ⬅️ اضافه شد

}
export function usePaymentVerification() {
  const verifyPayment = useCallback(
    async (authority: string, zarinpalStatus: "OK" | "NOK"): Promise<VerificationResult> => {
      try {
        const result = await paymentService.verifyZarinpalPayment({
          authority,
          status: zarinpalStatus,
        });

        if (result.code === 100 || result.code === 101) {
          toast.success("✅ پرداخت شما با موفقیت انجام شد");
          return {
            status: "success",
            refId: result.ref_id,
            cardPan: result.card_pan,
    sendingMethod: result.sending_method, // ⬅️ این خط

          };
        }

        if (result.code === -1) {
          toast.error("❌ پرداخت لغو یا رد شد");
          return { status: "unsuccess", message: result.message };
        }

        if (result.code === -2) {
          toast.error("⚠️ ارتباط با بانک برقرار نشد");
          return { status: "bank-error", message: result.message };
        }

        toast.error("⚠️ وضعیت پرداخت نامشخص است");
        return { status: "unknown", message: result.message };
      } catch (error) {
        console.error("❌ خطا در بررسی پرداخت:", error);
        toast.error("⚠️ ارتباط با بانک برقرار نشد");
        return {
          status: "bank-error",
          message: error instanceof Error ? error.message : "خطای ناشناخته",
        };
      }
    },
    [],
  );

  return { verifyPayment };
}