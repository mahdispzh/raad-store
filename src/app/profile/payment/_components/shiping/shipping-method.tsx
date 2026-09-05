// src/app/profile/payment/_components/shipping-method.tsx

"use client";

import { Subtitle } from "@/src/shared/ui";
import { ShippingOptions } from "./shipping-options";
import { ShippingSummary } from "./shipping-summary";
import shippingMethodsData from "../../_constants/shipping-method.json";
import { ShippingMethodProps } from "../../_types/shipping.types";
import { Order } from "../../_types/order.types";

export function ShippingMethod({
  productCount,
  totalProductPrice,
  selectedShipping,
  onSelectShipping,
  onConfirm,
  orderData,
}: Omit<ShippingMethodProps, "regularShippingCost" | "expressShippingCost"> & {
  orderData?: Order | null;
}) {
  const { shippingMethods, labels } = shippingMethodsData;

  const regularShippingCost = shippingMethods.regular.cost;
  const expressShippingCost = shippingMethods.express.cost;

  const shippingCost =
    selectedShipping === "regular" ? regularShippingCost : expressShippingCost;

  // ✅ منبع واحد قیمت: prop یا سفارشی که همین hook مسیر پرداخت ساخته —
  // دیگر نیازی به خواندن sessionStorage نیست، چون orderData از usePayment می‌آید
  // و در کل مسیر (order-summary → shipping-method → payment-method) زنده می‌ماند.
  const finalProductPrice = totalProductPrice || orderData?.total_price || 0;
  const finalTotalPrice = finalProductPrice + shippingCost;

  const handleConfirmWithData = () => {
    onConfirm();
  };

  return (
    <div className="flex h-auto w-full flex-col rounded-sm border border-gray">
      <div className="flex items-center border-b border-gray px-4 py-4 md:px-9 md:py-7">
        <Subtitle text={labels.shippingMethod.title} size="2xl" weight="medium" />
      </div>
      <div className="flex w-full flex-col gap-4 p-4 lg:flex-row lg:gap-7 lg:p-7 lg:pb-14">
        <ShippingOptions
          selected={selectedShipping}
          onSelect={onSelectShipping}
        />
        <ShippingSummary
          productPrice={finalProductPrice}
          shippingPrice={shippingCost}
          totalPrice={finalTotalPrice}
          onConfirm={handleConfirmWithData}
          count={productCount || 0}
        />
      </div>
    </div>
  );
}
