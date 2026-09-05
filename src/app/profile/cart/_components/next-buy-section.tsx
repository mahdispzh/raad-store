// نمایش بخش خرید بعدی و دکمه انتقال به سبد خرید

"use client";

import { Caption, Text } from "@/src/shared/ui";
import { NextBuySectionProps } from "../_types/cart.types";

export function NextBuySection({
  parcelCount,
  itemCount,
  onTransferAll,
}: NextBuySectionProps) {
  return (
    <div className="flex w-full flex-col gap-4 px-5 py-12 lg:flex-row lg:gap-6 lg:px-9">
      <div className="flex-3 rounded-sm border border-gray p-4 lg:p-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-[0.7vw]">
            <Text text="لیست خرید بعدی شما" size="lg" weight="bold" />
            <div className="h-2 w-2 rounded-full bg-gray" />
            <Caption
              size="xs"
              weight="regular"
              text={`${parcelCount} مرسوله`}
            />
          </div>
          <div className="cursor-pointer" onClick={onTransferAll}>
            <Text
              text="انتقال همه به سبد خرید"
              size="md"
              weight="regular"
              color="danger"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-[2vw] rounded-sm border border-gray p-4 pt-5 lg:p-6 lg:pt-9">
        <Text text={`${itemCount} کالا`} weight="regular" size="md" />
        <button
          onClick={onTransferAll}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xs bg-danger"
        >
          <Text
            text="انتقال همه به سبد خرید"
            weight="medium"
            size="md"
            color="white"
          />
        </button>
      </div>
    </div>
  );
}
