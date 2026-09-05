// src/app/profile/payment/_hooks/useCartManager.ts

"use client";

import { useCallback } from "react";
import { useCart } from "../../cart/_hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useCartManager() {
  const queryClient = useQueryClient();
  const {
    products,
    totalItemsCount,
    totalCartPrice,
    isLoading,
    error,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    clearCartItems,
    cartId,
  } = useCart();

  // ✅ تابع رفرش دیتا (با استفاده از invalidateQueries)
  const refreshData = useCallback(async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("اطلاعات سبد خرید به‌روزرسانی شد");
    } catch (error) {
      console.error("❌ خطا در رفرش دیتا:", error);
      toast.error("خطا در به‌روزرسانی اطلاعات");
    }
  }, [queryClient]);

  // ⚠️ هزینه‌ی ارسال قبلاً اینجا هاردکد بود (مقدار ثابت 60000) و به روش ارسال
  // انتخابی کاربر (selectedShipping) هیچ توجهی نمی‌کرد. این هوک اصلاً از
  // selectedShipping خبر ندارد — آن state در usePaymentReducer نگه‌داری می‌شود.
  // بنابراین محاسبه‌ی هزینه‌ی ارسال و قیمت نهایی از اینجا حذف شد و به
  // usePaymentFacade منتقل شد؛ همان جایی که selectedShipping در دسترس است.

  // ✅ خالی کردن سبد خرید بعد از پرداخت موفق
  const clearCartAfterSuccessfulPayment = useCallback(async () => {
    try {
      await clearCartItems();
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      sessionStorage.removeItem("checkoutCartData");
      toast.success("سبد خرید خالی شد");
    } catch (error) {
      console.error("❌ خطا در خالی کردن سبد خرید:", error);
      toast.error("خطا در خالی کردن سبد خرید");
    }
  }, [clearCartItems, queryClient]);

  return {
    products,
    totalItemsCount,
    totalCartPrice,
    isLoading,
    error,
    cartId,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    clearCartAfterSuccessfulPayment,
    refreshData,
  };
}
