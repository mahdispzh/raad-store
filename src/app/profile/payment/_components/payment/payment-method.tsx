// src/app/profile/payment/_components/payment-method.tsx

"use client";

import { Text } from "@/src/shared/ui";
import { PaymentMethodProps } from "../../_types/payment.types";
import { PaymentSummary } from "./payment-summary";
import { PaymentOptions } from "./payment-options";

export function PaymentMethod({
  productCount,
  totalProductPrice,
  shippingCost,
  totalPrice,
  finalPrice,
  onPay,
  selectedGateway,
  onSelectGateway,
  onApplyDiscount,
  isDiscountOpen,
  toggleDiscount,
  discountCodeInput,
  setDiscountCodeInput,
  discountError,
}: PaymentMethodProps) {
  // ✅ selectedGateway از قبل در state هوک usePayment نگه داشته می‌شود
  // و هنگام startPayment مستقیماً استفاده می‌شود؛ نیازی به ذخیره‌ی موازی
  // در sessionStorage ("checkoutCartData" / "checkoutFinalData") نیست.

  return (
    <div className="flex h-auto flex-col gap-4 lg:gap-7">
      <div className="flex flex-3 items-center rounded-sm border border-gray px-4 py-5 md:px-9 md:py-7">
        <Text text="انتخاب روش پرداخت" size="lg" weight="medium" />
      </div>
      <div className="flex h-full flex-col gap-4 lg:flex-row lg:gap-7">
        <PaymentOptions
          selectedGateway={selectedGateway}
          onSelectGateway={onSelectGateway}
          onApplyDiscount={onApplyDiscount}
          isDiscountOpen={isDiscountOpen}
          toggleDiscount={toggleDiscount}
          discountCodeInput={discountCodeInput}
          setDiscountCodeInput={setDiscountCodeInput}
          discountError={discountError}
        />
        <div className="flex-1">
          <PaymentSummary
            productCount={productCount}
            totalProductPrice={totalProductPrice}
            shippingCost={shippingCost}
            totalPrice={totalPrice}
            finalPrice={finalPrice}
            onPay={onPay}
          />
        </div>
      </div>
    </div>
  );
}
