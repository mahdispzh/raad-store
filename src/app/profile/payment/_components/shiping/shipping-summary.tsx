import { DefaultButton, Price, Text } from "@/src/shared/ui";
import { ShippingSummaryProps } from "../../_types/shipping.types";

export function ShippingSummary({
  productPrice,
  shippingPrice,
  totalPrice,
  onConfirm,
  count,
}: ShippingSummaryProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-5 self-start rounded-sm border border-gray p-4 md:gap-9 md:p-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[0.3vw]">
          <Text text="قیمت کالاها" size="sm" weight="medium" />
          <Text text={`(${count})`} size="sm" weight="medium" />
        </div>
        <Price price={productPrice} />
      </div>
      <div className="flex flex-row justify-between">
        <Text text="هزینه ارسال" size="sm" weight="medium" />
        <Price price={shippingPrice} />
      </div>
      <div className="flex flex-row justify-between">
        <Text text="مجموع" size="sm" weight="medium" />
        <Price price={totalPrice} />
      </div>
      <DefaultButton
        type="primary"
        style="fill"
        label="تایید"
        action={onConfirm}
      />
    </div>
  );
}
