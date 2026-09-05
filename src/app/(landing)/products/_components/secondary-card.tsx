"use client";

import { StoreIcon, VerifiedIcon } from "@/src/shared/constants/icons";
import { Caption, DefaultButton, Price, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { SecondaryCardProps } from "../_types/landing-product.types";
import { LoginFlowModal } from "./login-flow-modal";
import { StoreCardActions } from "./store-card-actions";

export function SecondaryCard({
  title,
  price,
  image,
  colorName,
  size,
  stock,
  discount, // ⬅️ اضافه شد
  isLoggedIn,
  isInCart,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease,
  onViewCart,
  isLoading = false,
}: SecondaryCardProps) {
  const isOutOfStock = stock === 0;
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    onAddToCart();
  };

  return (
    <div className="flex h-auto max-h-24 w-full flex-row items-center gap-3 rounded-sm bg-accent p-2 sm:max-h-28 sm:gap-4 sm:p-3 lg:h-auto lg:max-h-none lg:flex-col lg:items-stretch lg:gap-0 lg:p-0">
      <div className="flex w-full flex-row gap-3 lg:gap-[2vw] lg:pl-[1vw]">
        <div className="relative block aspect-square w-16 flex-none sm:w-20 lg:w-1/2">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-sm object-cover lg:rounded-[0_10_0_90px]"
            sizes="(max-width: 1024px) 80px, 50vw"
            quality={85}
          />
        </div>
        <div className="flex w-full flex-1 flex-col justify-center gap-1 lg:w-1/2 lg:flex-none lg:justify-start lg:gap-[2vw] lg:py-0 lg:pt-[3vw] lg:pb-[2vw]">
          <Text text={title} size="md" weight="medium" />
          <div className="flex flex-row items-center gap-3 lg:flex-col lg:items-start lg:gap-[1vw]">
            <div className="flex flex-row gap-1 lg:gap-[0.4vw]">
              <Text text="رنگ :" size="sm" weight="medium" />
              <Text text={colorName} size="sm" weight="medium" />
            </div>
            <div className="flex flex-row gap-1 lg:gap-[0.4vw]">
              <Text text="سایز :" size="sm" weight="medium" />
              <Text text={size} size="sm" weight="medium" />
            </div>
          </div>
          <div className="hidden h-px w-full bg-gray lg:block" />
          <div className="hidden flex-col gap-2 lg:flex lg:gap-[1vw]">
            <div className="flex flex-row items-center gap-1 lg:gap-[0.3vw]">
              <StoreIcon size="md" />
              <Caption size="xs" text="فروشگاه بونامی" weight="medium" />
            </div>
            <div className="flex flex-row items-center gap-1 lg:gap-[0.3vw]">
              <VerifiedIcon size="md" />
              <Caption
                size="xs"
                text="گارانتی اصالت و سلامت فیزیکی کالا"
                weight="medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* قیمت و دکمه: کنار متن در حالت فشرده، زیرش در حالت سایدبار */}
      <div className="flex w-auto flex-none flex-col items-end gap-1 lg:w-full lg:items-stretch lg:gap-2 lg:p-[1.5vw]">
        <div className="flex w-full flex-row items-center justify-between gap-2 pt-2 pb-4 md:pt-[1vw] md:pb-[1vw]">
          {discount ? (
            <span className="rounded-full bg-danger px-2 py-1">
              <Text
                text={`٪${discount}`}
                size="sm"
                weight="medium"
                color="white"
              />
            </span>
          ) : (
            <div></div>
          )}
          <Price price={price} size="2xl" {...(discount ? { discount } : {})} />
        </div>
        {isOutOfStock ? (
          <button
            disabled
            className="flex h-9 w-28 cursor-not-allowed items-center justify-center rounded-sm bg-gray-300 lg:h-12 lg:w-full"
          >
            <Text
              text="اتمام موجودی"
              size="sm"
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
    </div>
  );
}
