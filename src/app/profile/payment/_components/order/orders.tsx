// src/app/profile/payment/_components/order/orders.tsx

"use client";

import { CartItemCard } from "@/src/shared/components/cart-item-card/cart-item-card.ui";
import { TruckIcon } from "@/src/shared/constants/icons/truck-icon";
import { Caption, Text } from "@/src/shared/ui";
import { useEffect } from "react";
import { SummaryAddressSelector } from "../address/summary-address-selector";
import { OrdersSummary } from "./orders-summary";

interface OrdersProps {
  productCount: number;
  totalProductPrice: number;
  address: string;
  shippingCost: number;
  onSubmit: () => void; // ✅ این تابع می‌تواند createOrder یا هر تابع دیگری باشد
  onChangeAddress: () => void;
  products: any[];
  shippingTitle?: string;
  onIncrease?: (id: number) => void;
  onDecrease?: (id: number) => void;
  onRemove?: (id: number) => void;
  isLoading?: boolean;
}

export function Orders({
  productCount,
  totalProductPrice,
  address,
  shippingCost,
  onSubmit,
  onChangeAddress,
  products = [],
  shippingTitle = "ارسال پستی",
  onIncrease,
  onDecrease,
  onRemove,
  isLoading = false,
}: OrdersProps) {
  const total = totalProductPrice + shippingCost;

  // دیباگ
  useEffect(() => {
    console.log("📦 Orders rendered with:", {
      address,
      productCount,
      totalProductPrice,
      shippingCost,
      productsCount: products.length,
      onSubmit: typeof onSubmit,
    });
  }, [
    address,
    productCount,
    totalProductPrice,
    shippingCost,
    products.length,
    onSubmit,
  ]);
  console.log("products fix image:", products);
  return (
    <div className="mb-4 flex h-auto w-full flex-col gap-4 lg:gap-7">
      <SummaryAddressSelector
        address={address || "آدرسی انتخاب نشده است"}
        onOpenModal={() => {
          console.log("🔄 کلیک روی انتخاب آدرس");
          onChangeAddress();
        }}
      />
      <div className="flex w-full flex-col gap-4 md:items-start lg:flex-row lg:gap-7">
        <div className="w-full flex-3 rounded-sm border border-gray p-4 md:p-6">
          {/* بخش انتخاب آدرس */}

          <div className="mt-4 flex flex-row gap-1">
            <div className="mt-1">
              <TruckIcon size="md" color="text-primary" />
            </div>
            <Text size="lg" text={shippingTitle} weight="medium" />
            <div className="flex h-5 w-8 items-center justify-center rounded-xs bg-danger pt-[0.2vw]">
              <Caption
                text={`${productCount} کالا`}
                size="xs"
                color="white"
                weight="medium"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-6 md:items-start">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItemCard
                  key={product.id}
                  id={product.id}
                  title={
                    product.productName ||
                    product.title ||
                    product.name ||
                    "محصول"
                  }
                  imageSrc={product.imageSrc || "/images/placeholder.svg"}
                  color={product.colorName || "نامشخص"}
                  colorHex={product.colorHex || "#CCCCCC"}
                  size={product.sizeName || "نامشخص"}
                  shippingMethod={shippingTitle}
                  price={product.price || 0}
                  discount={product.discount || undefined}
                  quantity={product.quantity || 1}
                  onIncrease={() => onIncrease?.(product.id)}
                  onDecrease={() => onDecrease?.(product.id)}
                  onRemove={() => onRemove?.(product.id)}
                />
              ))
            ) : (
              <Text
                text="محصولی در سبد خرید وجود ندارد"
                size="sm"
                color="gray"
              />
            )}
          </div>
        </div>

        {/* ✅ اینجا onSubmit به عنوان prop پاس داده می‌شود */}
        <OrdersSummary
          productPrice={totalProductPrice}
          shippingPrice={shippingCost}
          totalPrice={total}
          onSubmit={onSubmit}
          count={productCount}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
