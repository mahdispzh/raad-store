"use client";

import Image from "next/image";
import { TrashIcon } from "../../constants/icons";
import { OfficerIcon } from "../../constants/icons/officer-icon";
import { RulerIcon } from "../../constants/icons/ruler-icon";
import { StoreIcon } from "../../constants/icons/store-icon";
import { VerifiedIcon } from "../../constants/icons/verified-icon";
import { Price, Text } from "../../ui";
import { QuantitySelector } from "../../ui/quantity-selector/quantity-selector.ui";
import {
  getDiscountBadgeClass,
  SHIPPING_INFO,
} from "./cart-item-card.constants";
import { CartItemCardProps } from "./cart-item-card.types";
import { useCartItemCard } from "./useCartItemCard";

export function CartItemCard({
  id,
  title,
  imageSrc,
  color,
  colorHex,
  size,
  shippingMethod,
  price,
  discount,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  const { imageUrl, handleImageError } = useCartItemCard(imageSrc);

  const hasDiscount = Boolean(discount && discount > 0);
  const discountBadgeClass = getDiscountBadgeClass(hasDiscount);

  return (
    <div className="flex h-auto w-full flex-col gap-4 min-[500px]:flex-row sm:gap-6 md:h-68.75 md:w-120">
      <div className="relative h-48 w-full shrink-0 min-[500px]:h-auto min-[500px]:w-40 min-[500px]:flex-3 md:w-55">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-sm object-cover"
          sizes="(max-width: 768px) 100vw, 220px"
          quality={80}
          onError={handleImageError}
          priority={false}
        />
      </div>
      <div className="flex w-full min-w-0 flex-1 flex-col justify-between gap-2 min-[500px]:flex-3">
        <div className="flex flex-col gap-2">
          <Text text={title} size="lg" weight="medium" />
          <div className="flex flex-col gap-2 border-y border-gray py-2">
            <div className="flex flex-row items-center gap-1">
              <StoreIcon size="sm" />
              <Text text={SHIPPING_INFO.storeName} size="sm" />
            </div>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-5">
              <div className="flex flex-row items-center gap-1">
                <RulerIcon size="sm" />
                <Text text={size} size="sm" />
              </div>
              <div className="flex flex-row items-center gap-1">
                <div
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: colorHex }}
                ></div>
                <Text text={color} size="sm" />
              </div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <VerifiedIcon size="sm" />
              <Text text={SHIPPING_INFO.guarantee} size="sm" />
            </div>
            <div className="flex flex-row items-center gap-1">
              <OfficerIcon size="sm" />
              <Text text={shippingMethod} size="sm" />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          {hasDiscount ? (
            <div className={discountBadgeClass}>
              <Text text={`${discount}%`} color="white" size="sm" />
            </div>
          ) : (
            <div></div>
          )}
          <Price
            price={price}
            size="lg"
            {...(discount && discount > 0 && { discount })}
          />
        </div>
        <div className="flex w-[200px] flex-row items-stretch gap-2">
          <QuantitySelector
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            type="primary"
            className="flex-5"
          />
          <div className="flex flex-2 items-end">
            <div onClick={onRemove} className="mb-2 cursor-pointer lg:mb-1">
              <TrashIcon size="md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
