// src/app/profile/payment/_components/order/orders-summary.tsx

import { DefaultButton, Price, Text } from "@/src/shared/ui";

interface OrdersSummaryProps {
  productPrice: number;
  shippingPrice: number;
  totalPrice: number;
  onSubmit: () => void;
  count: number;
  isLoading?: boolean;
}

export function OrdersSummary({
  productPrice,
  shippingPrice,
  totalPrice,
  onSubmit,
  count,
  isLoading = false,
}: OrdersSummaryProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-5 rounded-sm border border-gray p-4 md:gap-9 md:p-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-[0.3vw]">
          <Text text="قیمت کالاها" size="sm" weight="medium" />
          <Text text={`(${count})`} size="sm" weight="medium" />
        </div>
        <Price price={productPrice} />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Text text="ارسال پستی" size="sm" weight="medium" />
        <Price price={shippingPrice} />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Text text="مبلغ قابل پرداخت" size="sm" weight="medium" />
        <Price price={totalPrice} />
      </div>
    <DefaultButton
  type="primary"
  style="fill"
  label={isLoading ? "در حال ثبت سفارش..." : "ثبت سفارش"}
  action={onSubmit}
  disabled={isLoading || count === 0}
/>
    </div>
  );
}
