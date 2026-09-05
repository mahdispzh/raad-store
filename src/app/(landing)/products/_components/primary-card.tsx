"use client";

import {
  DeliveryIcon,
  OfficerIcon,
  StoreIcon,
  TruckIcon,
  VerifiedIcon,
} from "@/src/shared/constants/icons";
import { DefaultButton, Price, Subtitle, Text } from "@/src/shared/ui";
import { useState } from "react";
import { PrimaryCardProps } from "../_types/landing-product.types";
import { LoginFlowModal } from "./login-flow-modal";
import { StoreCardActions } from "./store-card-actions";

export function PrimaryCard({
  price,
  stock,
  isLoggedIn,
  isInCart,
  quantity,
  discount,
  onAddToCart,
  onIncrease,
  onDecrease,
  onViewCart,
  isLoading = false,
}: PrimaryCardProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isOutOfStock = stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    onAddToCart();
  };

  const handleIncreaseClick = () => {
    if (isOutOfStock) return;
    onIncrease();
  };

  const handleLoginSuccess = () => {
    // بعد از لاگین موفق، محصول را به سبد خرید اضافه کن
    onAddToCart();
  };

  return (
    <>
      <div className="m-4 h-auto w-full rounded-sm bg-accent p-6 md:m-[3vw] md:p-11">
        {/* بخش ثابت فروشگاه و گارانتی */}
        <div className="flex flex-row items-center gap-1 md:gap-[0.3vw]">
          <StoreIcon size="lg" color="text-primary" />
          <Subtitle
            text="فروشگاه بونامی"
            size="xl"
            color="primary"
            weight="medium"
          />
        </div>
        <div className="mt-2 h-px w-full bg-gray" />
        <div className="flex flex-row items-center gap-1 py-4 md:gap-[0.3vw] md:py-[2vw]">
          <VerifiedIcon size="sm" />
          <Text
            text="گارانتی اصالت و سلامت فیزیکی کالا"
            weight="medium"
            size="md"
          />
        </div>
        <div className="h-px w-full bg-gray" />
        <div className="flex flex-row gap-1 pt-4 md:gap-[0.3vw] md:pt-[2vw]">
          <DeliveryIcon size="md" color="text-primary" />
          <Text text="روش ها و هزینه‌های ارسال" weight="medium" size="md" />
        </div>
        <div className="my-6 flex flex-row gap-1 md:gap-[0.3vw]">
          <TruckIcon size="md" color="text-primary" />
          <Text text="پست پیشتاز" size="sm" weight="regular" />
        </div>
        <div className="flex flex-row gap-1 md:gap-[0.3vw]">
          <OfficerIcon size="sm" color="text-primary" />
          <Text text="تیپاکس" size="sm" weight="regular" />
        </div>
        <div className="my-6 h-px w-full bg-gray" />
        <div className="flex w-full flex-row items-center justify-between gap-2 pt-2 pb-4 md:pt-[1vw] md:pb-[1vw]">
          {discount ? (
            <span className="rounded-full bg-danger px-1.5 py-1">
              <Text
                text={`٪${discount}`}
                size="sm"
                weight="medium"
                color="white"
              />
            </span>
          ) : (
            <Text text="" />
          )}
          <Price price={price} size="2xl" {...(discount ? { discount } : {})} />
        </div>

        {isOutOfStock ? (
          <button
            disabled
            className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded-sm bg-gray-300 md:h-[3vw]"
          >
            <Text
              text="اتمام موجودی"
              size="lg"
              weight="medium"
              color="accent"
            />
          </button>
        ) : !isInCart ? (
          <DefaultButton
            label="افزودن به سبد خرید"
            style="fill"
            action={handleAddToCart}
            disabled={isLoading}
          />
        ) : (
          <StoreCardActions
            count={quantity}
            onIncrease={handleIncreaseClick}
            onDecrease={onDecrease}
            onViewCart={onViewCart}
            disabled={isLoading}
          />
        )}
      </div>

      <LoginFlowModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
