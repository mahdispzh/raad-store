// src/app/profile/payment/(pages)/page.tsx

"use client";

import { CheckoutStepper } from "@/src/shared/components/checkout-stepper";
import { Modal } from "@/src/shared/ui";
import { useRouter } from "next/navigation";
import { AddressSelectionModalContent } from "../_components/address/address-selection-modal-content";
import { Header } from "../_components/header";
import { Orders } from "../_components/order/orders";
import { PaymentMethod } from "../_components/payment/payment-method";
import { PaymentStatus } from "../_components/payment/payment-status.ui";
import { ShippingMethod } from "../_components/shiping/shipping-method";
import shippingMethodsData from "../_constants/shipping-method.json";
import { usePaymentFacade } from "../_hooks/usePaymentFacade";

function CheckoutWrapper({
  step,
  onBack,
  children,
}: {
  step: 1 | 2 | 3 | 4 | 5;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-auto w-full flex-col px-[2vw] pt-[2vw]">
      <Header {...(onBack ? { onArrowClick: onBack } : {})} />{" "}
      <div className="flex justify-center">
        <CheckoutStepper currentStep={step} />
      </div>
      {children}
    </div>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const {
    step,
    selectedShipping,
    selectedGateway,
    shippingCost,
    totalPrice,
    finalPrice,
    productCount,
    products,
    savedProducts,

    selectedAddress,
    orderData,
    isProcessing,
    isVerifying,
    paymentStatus,
    addresses,
    selectedAddressId,
    isAddressModalOpen,
    // discountCodeInput,
    // discountError,
    // isDiscountOpen,

    // Actions
    goToNextStep,
    goToPrevStep,
    goToStep,
    selectShipping,
    selectGateway,
    createOrder,
    startPayment,
    openAddressModal,
    closeAddressModal,
    setSelectedAddressId,
    confirmAddressSelection,
    handleProductIncrease,
    handleProductDecrease,
    handleProductRemove,
    applyDiscount,
    toggleDiscount,
    setDiscountCodeInput,
        refId,   // ⬅️ همین خط اضافه شد

  } = usePaymentFacade();

  // ✅ نمایش خطا
  if (isVerifying) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">در حال بررسی وضعیت پرداخت...</p>
        </div>
      </div>
    );
  }
const failedType: "unsuccess" | "unknown" | "bank-error" =
  paymentStatus === "success"
    ? "unknown"
    : paymentStatus;
  // ✅ مودال انتخاب آدرس
  const addressModal = (
    <Modal isOpen={isAddressModalOpen} onClose={closeAddressModal}>
      <AddressSelectionModalContent
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onClose={closeAddressModal}
        onConfirm={confirmAddressSelection}
        onSelectAddressId={setSelectedAddressId}
        isLoading={false}
      />
    </Modal>
  );

  // ✅ مرحله 1: خلاصه سفارش
  if (step === "order-summary") {
    const shippingTitle =
      shippingMethodsData?.shippingMethods?.[selectedShipping]?.title ||
      (selectedShipping === "regular" ? "ارسال معمولی" : "ارسال سریع");

    return (
      <>
        <CheckoutWrapper step={2} onBack={() => router.push("/profile/cart")}>
          <Orders
            address={selectedAddress?.fullAddress || "آدرسی انتخاب نشده است"}
            productCount={productCount}
            shippingCost={shippingCost}
            totalProductPrice={totalPrice - shippingCost}
            onChangeAddress={openAddressModal}
            onSubmit={createOrder}
            products={products}
            shippingTitle={shippingTitle}
            onIncrease={handleProductIncrease}
            onDecrease={handleProductDecrease}
            onRemove={handleProductRemove}
            isLoading={isProcessing}
          />
        </CheckoutWrapper>
        {addressModal}
      </>
    );
  }

  // ✅ مرحله 2: روش ارسال
  if (step === "shipping-method") {
    return (
      <CheckoutWrapper step={3} onBack={goToPrevStep}>
        <ShippingMethod
          productCount={productCount}
          selectedShipping={selectedShipping}
          totalProductPrice={totalPrice - shippingCost}
          onConfirm={goToNextStep}
          onSelectShipping={selectShipping}
          orderData={orderData}
        />
      </CheckoutWrapper>
    );
  }

  // ✅ مرحله 3: روش پرداخت
if (step === "payment-method") {
  return (
    <CheckoutWrapper step={4} onBack={goToPrevStep}>
      <PaymentMethod
        productCount={productCount}
        totalProductPrice={totalPrice - shippingCost}
        shippingCost={shippingCost}
        totalPrice={totalPrice}
        finalPrice={finalPrice}
        onPay={startPayment}
        selectedGateway={selectedGateway}
        onSelectGateway={selectGateway}
        onApplyDiscount={applyDiscount}
        toggleDiscount={toggleDiscount}
        setDiscountCodeInput={setDiscountCodeInput}
      />
    </CheckoutWrapper>
  );
}

  // ✅ مرحله 5: نمایش وضعیت نهایی پرداخت
  if (step === "success") {
    if (paymentStatus === "success") {
      return (
        <CheckoutWrapper step={5} onBack={() => router.push("/")}>
          <PaymentStatus
            type="success"
            success={{
              info: {
  trackingCode: refId ? String(refId) : "-", // ⬅️ به‌جای orderData?.id
                dateTime: orderData?.updated_at
                  ? new Date(orderData.updated_at).toLocaleString("fa-IR")
                  : new Date().toLocaleString("fa-IR"),
                paymentStatus: "پرداخت موفق",
  totalPrice: orderData?.total_price ?? finalPrice,
                receiverName: selectedAddress?.receiverName || "-",
                phone: selectedAddress?.receiverPhone || "-",
                address: selectedAddress?.fullAddress || "-",
                shippingMethod:
                  shippingMethodsData?.shippingMethods?.[selectedShipping]
                    ?.title ||
                  (selectedShipping === "regular"
                    ? "ارسال معمولی"
                    : "ارسال سریع"),
                postalCode: selectedAddress?.postalCode || "-",
              },
              products: savedProducts,
            }}
          />
        </CheckoutWrapper>
      );
    }

    // ناموفق یا نامشخص
    return (
    <CheckoutWrapper step={5}>
  {/* اگر این بخش فقط برای نمایش خطاهای بانکی است */}
  <PaymentStatus
  type={failedType}
  failed={{
    orderNumber: orderData?.id ? String(orderData.id) : "-",
    details: [
      {
        gateway: "زرین‌پال",
        trackingCode: orderData?.id ? String(orderData.id) : "-",
        date: new Date().toLocaleString("fa-IR"),
      },
    ],
    onRetryPayment: () => {
      startPayment();
    },
    onChangePaymentMethod: () => {
      goToStep("payment-method");
    },
  }}
/>
      </CheckoutWrapper>
    );
  }

  return null;
}
