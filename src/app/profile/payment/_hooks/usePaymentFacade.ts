// src/app/profile/payment/_hooks/usePaymentFacade.ts

"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { usePaymentReducer } from "./usePaymentReducer";
import { useAddressManager } from "./useAddressManager";
import { useOrderCreation } from "./useOrderCreation";
import { usePaymentProcess } from "./usePaymentProcess";
import { usePaymentVerification } from "./usePaymentVerification";
import shippingMethodsData from "../_constants/shipping-method.json";
import { useCartManager } from "./useCartManager";

export function usePaymentFacade() {
  const searchParams = useSearchParams();
  const [savedProducts, setSavedProducts] = useState<Array<{
    id: number;
    imageSrc: string;
    title: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }>>([]);

  const {
    state,
    setStep,
    nextStep,
    prevStep,
    setShipping,
    setGateway,
    setOrder,
    setProcessing,
    setPaymentStatus,
    setVerifying,
    setDiscountCode,
    toggleDiscount,
    setDiscountError,
        setRefId,   // ⬅️ همین خط اضافه شد

  } = usePaymentReducer();

  const cartManager = useCartManager();
  const addressManager = useAddressManager();
  const orderCreation = useOrderCreation();
  const paymentProcess = usePaymentProcess();
  const paymentVerification = usePaymentVerification();

  const shippingCost = useMemo(() => {
    const method = shippingMethodsData?.shippingMethods?.[state.selectedShipping];
    return method?.cost ?? 0;
  }, [state.selectedShipping]);

  const totalPrice = cartManager.totalCartPrice + shippingCost;
  const finalPrice = totalPrice - state.discount.amount;

  // ✅ ایجاد سفارش
  const handleCreateOrder = useCallback(async () => {
    setProcessing(true);

    try {
      const order = await orderCreation.createOrder({
        cartId: cartManager.cartId!,
        addressId: addressManager.selectedAddressId!,
        totalPrice: totalPrice,
        shippingMethod: state.selectedShipping,
        paymentMethod: state.selectedGateway,
        items: cartManager.products.map((product: any) => ({
          productId: product.productId,
          variantId: product.variantId,
          quantity: product.quantity,
          price: product.price,
        })),
      });

      if (order) {
        setOrder(order.id, order);

       sessionStorage.setItem(
  "checkoutSnapshot",
  JSON.stringify({
    orderId: order.id,
    orderData: order,
        selectedShipping: state.selectedShipping, // ⬅️ اضافه شد

    savedProducts: cartManager.products.map((p: any) => ({
      id: p.id,
      imageSrc: p.imageSrc || p.image || "/images/placeholder.svg",
      title: p.productName || p.name || "محصول",
      price: p.price || 0,
      quantity: p.quantity || 1,
      size: p.sizeName || p.size,
      color: p.colorHex || p.colorCode,
    })),
  }),
);
        nextStep();
      }
    } catch (error) {
      console.error("❌ خطا در ایجاد سفارش:", error);
    } finally {
      setProcessing(false);
    }
  }, [
    cartManager.cartId,
    cartManager.products,
    addressManager.selectedAddressId,
    totalPrice,
    state.selectedShipping,
    state.selectedGateway,
    orderCreation,
    setOrder,
    nextStep,
    setProcessing,
  ]);

  // ✅ شروع پرداخت — مستقیم می‌ره به زرین‌پال
  const handleStartPayment = useCallback(async () => {
    if (!state.orderId) {
      console.error("❌ سفارشی برای پرداخت وجود ندارد");
      return;
    }

    setProcessing(true);

    try {
      const result = await paymentProcess.processPayment({
        orderId: state.orderId,
        sendingMethod: state.selectedShipping,
      });

      if (result.success && result.paymentUrl) {
        window.location.href = result.paymentUrl;
      }
    } catch (error) {
      console.error("❌ خطا در پرداخت:", error);
    } finally {
      setProcessing(false);
    }
  }, [state.orderId, state.selectedShipping, paymentProcess, setProcessing]);

  // ✅ بررسی وضعیت پرداخت (وقتی از زرین‌پال برمی‌گردد)
  const handleVerifyPayment = useCallback(async () => {
    const authority = searchParams.get("Authority");
    const zarinpalStatus = searchParams.get("Status") as "OK" | "NOK" | null;

    if (!authority || !zarinpalStatus) {
      return;
    }

    setVerifying(true);

    try {
   const result = await paymentVerification.verifyPayment(authority, zarinpalStatus);
setPaymentStatus(result.status);
setRefId(result.refId ?? null);
if (result.sendingMethod === "regular" || result.sendingMethod === "express") {
  setShipping(result.sendingMethod); // ⬅️ اضافه شد — جای snapshot می‌شینه
}
      if (result.status === "success") {
        await cartManager.clearCartAfterSuccessfulPayment();
      }

      setStep("success");
    } catch (error) {
      console.error("❌ خطا در بررسی پرداخت:", error);
      setPaymentStatus("bank-error");
      setStep("success");
    } finally {
      setVerifying(false);
    }
  }, [searchParams, paymentVerification, cartManager, setPaymentStatus, setStep, setVerifying]);

// usePaymentFacade.ts
// افکت ۱: صدا زدن verify وقتی از بانک برگشتیم
useEffect(() => {
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  if (authority && status && verifiedAuthorityRef.current !== authority) {
    verifiedAuthorityRef.current = authority;
    handleVerifyPayment();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchParams]);

// افکت ۲: بازیابی snapshot (این همونیه که قبلاً اضافه کردیم)
useEffect(() => {
  const authority = searchParams.get("Authority");
  if (!authority) return;

  const raw = sessionStorage.getItem("checkoutSnapshot");
  if (!raw) return;

  try {
    const snapshot = JSON.parse(raw);
    if (snapshot.orderId && snapshot.orderData) {
      setOrder(snapshot.orderId, snapshot.orderData);
    }
   
    if (snapshot.savedProducts) {
      setSavedProducts(snapshot.savedProducts);
    }
  } catch (e) {
    console.error("❌ خطا در بازیابی checkoutSnapshot:", e);
  }
}, []);
  const handleApplyDiscount = useCallback(
    (code: string) => {
      setDiscountError("کد تخفیف نامعتبر است");
      return false;
    },
    [setDiscountError],
  );
const verifiedAuthorityRef = useRef<string | null>(null);
  const paymentInfo = {
    totalPrice,
    finalPrice,
    shippingCost,
    productCount: cartManager.totalItemsCount,
    products: cartManager.products,
    selectedAddress: addressManager.selectedAddress,
    orderData: state.orderData,
    orderId: state.orderId,
    isProcessing: state.isProcessing || orderCreation.isLoading,
    isVerifying: state.isVerifying,
    paymentStatus: state.paymentStatus,
    step: state.step,
    selectedShipping: state.selectedShipping,
    selectedGateway: state.selectedGateway,
    discountCodeInput: state.discount.code,
    discountError: state.discount.error,
    isDiscountOpen: state.discount.isOpen,
      refId: state.refId,

  };

  return {
    ...paymentInfo,

    addresses: addressManager.addresses,
    selectedAddressId: addressManager.selectedAddressId,
    isAddressModalOpen: addressManager.isAddressModalOpen,
    openAddressModal: addressManager.openAddressModal,
    closeAddressModal: addressManager.closeAddressModal,
    setSelectedAddressId: addressManager.setSelectedAddressId,
    confirmAddressSelection: addressManager.confirmAddressSelection,

    handleProductIncrease: cartManager.handleProductIncrease,
    handleProductDecrease: cartManager.handleProductDecrease,
    handleProductRemove: cartManager.handleProductRemove,

    goToNextStep: nextStep,
    goToPrevStep: prevStep,
    goToStep: setStep,

    selectShipping: setShipping,
    selectGateway: setGateway,

    createOrder: handleCreateOrder,
    startPayment: handleStartPayment,
    verifyPayment: handleVerifyPayment,

    applyDiscount: handleApplyDiscount,
    toggleDiscount,
    setDiscountCodeInput: setDiscountCode,

    setPaymentStatus,
    clearCartAfterSuccessfulPayment: cartManager.clearCartAfterSuccessfulPayment,
    savedProducts,
  };
}