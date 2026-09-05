// src/app/profile/card/_components/cart-summary.tsx

"use client";

import { DefaultButton, Price, Text } from "@/src/shared/ui";
import { CartSummaryProps } from "../_types/cart.types";

export function CartSummary({
  totalPrice,
  totalItemsCount,
  totalCartPrice,
  userProfit,
  onConfirmOrder,
}: CartSummaryProps) {
  return (
    <div className="flex h-fit flex-1 flex-col gap-[2vw] rounded-sm border border-gray p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Text text="قیمت کالاها" size="sm" weight="medium" />
        <Price price={totalPrice} />
      </div>
      <div className="flex items-center justify-between">
        <Text text="تعداد کالاها" size="sm" weight="medium" />
        <Text text={`${totalItemsCount} عدد`} size="sm" weight="medium" />
      </div>
      <div className="flex items-center justify-between">
        <Text text="جمع کل سبد خرید" size="sm" weight="medium" />
        <Price price={totalCartPrice} />
      </div>
      <div className="flex items-center justify-between">
        <Text text="سود شما از این خرید" size="sm" weight="medium" />
        <Price price={userProfit} />
      </div>
      <div className="pt-[2vw]">
        <DefaultButton
          type="primary"
          style="fill"
          label="تایید و تکمیل سفارش"
          action={onConfirmOrder}
          disabled={totalItemsCount === 0}
        />
      </div>
    </div>
  );
}