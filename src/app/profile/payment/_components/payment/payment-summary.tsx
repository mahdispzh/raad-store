import { DefaultButton, Price, Text } from "@/src/shared/ui";
import { PaymentSummaryProps } from "../../_types/payment.types";

export function PaymentSummary({
  productCount,
  totalProductPrice,
  shippingCost,
  totalPrice,
  finalPrice,
  onPay,
}: PaymentSummaryProps) {
  const hasDiscount = finalPrice < totalPrice;

  return (
    <div className="flex flex-1 flex-col gap-5 rounded-sm border border-gray p-4 md:gap-9 md:p-6">
      <div className="flex flex-row items-center justify-between">
        <Text
          text={`قیمت کالاها (${productCount})`}
          size="sm"
          weight="medium"
        />
        <Price price={totalProductPrice} />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Text text="هزینه ارسال" size="sm" weight="medium" />
        <Price price={shippingCost} />
      </div>
      {hasDiscount && (
        <div className="flex flex-row items-center justify-between border-t border-gray pt-2">
          <Text text="تخفیف" size="sm" weight="medium" color="success" />
          <Price price={totalPrice - finalPrice} />
        </div>
      )}
      <div className="flex flex-row items-center justify-between">
        <Text text="مبلغ قابل پرداخت" size="sm" weight="medium" />
        <Price price={finalPrice} />
      </div>
      <DefaultButton
        type="primary"
        style="fill"
        label="پرداخت"
        action={onPay}
      />
    </div>
  );
}
