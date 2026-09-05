"use client";

import Image from "next/image";
import { RulerIcon } from "../../constants/icons/ruler-icon";
import { TrashIcon } from "../../constants/icons/trash-icon";
import { Caption, Price, Text } from "../../ui";
import { QuantitySelector } from "../../ui/quantity-selector/quantity-selector.ui";
import { CartModalProductProps } from "./cart-modal-product.types";

// ==================== کامپوننت اصلی ====================
export function CartModalProduct({
  title,
  imageSrc,
  color,
  colorHex,
  size,
  price,
  discount,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartModalProductProps) {
  return (
    <div className="w-fll flex flex-row items-end justify-between">
      <div className="flex h-[140px] w-[270px] flex-row gap-4">
        <Image
          src={imageSrc}
          alt={title}
          width={100}
          height={140}
          quality={100}
          className="h-[140px] w-[100px] rounded-xs object-cover"
        />
        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-1">
            <Text text={title} size="lg" weight="medium" />
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                <RulerIcon size="xs" />
                <Text text={size} size="sm" />
              </div>
              <div className="flex flex-row items-center gap-1">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colorHex }}
                ></div>
                <Caption text={color} size="xs" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {/* قیمت و تخفیف */}
            <div className="flex flex-row items-center justify-between">
              {discount ? (
                <div className="flex h-3.5 w-7 items-center justify-center rounded-sm bg-danger">
                  <Caption text={`${discount}%`} color="white" size="xs" />
                </div>
              ) : (
                <div></div>
              )}
              <Price
                price={price}
                size="md"
                {...(discount !== undefined && { discount })}
              />
            </div>
            <div className="w-full">
              <QuantitySelector
                quantity={quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                type="primary"
                className="flex-5"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
      <div onClick={onRemove} className="mb-1.5 cursor-pointer">
        <TrashIcon size="md" />
      </div>
    </div>
  );
}
