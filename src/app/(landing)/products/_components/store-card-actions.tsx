"use client";

import { MinusIcon, PlusEmptyIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { StoreCardActionsProps } from "../_types/landing-product.types";

export function StoreCardActions({
  count,
  onIncrease,
  onDecrease,
  onViewCart,
  buttonTextSize = "lg",
  disabled = false,
}: StoreCardActionsProps) {
  return (
    <div className="flex flex-row items-stretch gap-2 md:gap-[1vw]">
      <div className="flex w-1/2 flex-none flex-row items-center justify-center gap-2 rounded-sm border border-secondary px-1 sm:gap-3 md:gap-[1.5vw]">
        <button
          onClick={onIncrease}
          className="cursor-pointer px-1.5 py-2 sm:px-2"
          disabled={disabled}
        >
          <PlusEmptyIcon size="sm" color="text-primary" />
        </button>
        <Text text={count.toString()} size="md" weight="bold" color="primary" />
        <button
          onClick={onDecrease}
          className="cursor-pointer px-1.5 py-2 sm:px-2"
          disabled={disabled}
        >
          <MinusIcon size="sm" color="text-primary" />
        </button>
      </div>
      <div className="w-1/2 flex-none">
        <button
          onClick={onViewCart}
          disabled={disabled}
          className="flex h-full min-h-10 w-full cursor-pointer items-center justify-center rounded-sm bg-primary px-2 disabled:opacity-50 md:h-11"
        >
          <Text
            text="مشاهده سبد خرید"
            size={buttonTextSize}
            weight="medium"
            color="accent"
          />
        </button>
      </div>
    </div>
  );
}
