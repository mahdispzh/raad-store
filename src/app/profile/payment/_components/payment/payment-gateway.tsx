// - درگاه پرداخت (بدون state داخلی)
"use client";
import { ClockIcon } from "@/src/shared/constants/icons/clock-icon";
import { PayIcon } from "@/src/shared/constants/icons/pay-icon";
import { Subtitle, Text } from "@/src/shared/ui";
import { PaymentGatewayProps } from "../../_types/payment.types";

export function PaymentGateway({
  totalPrice,
  finalPrice,
  bankName,
  isProcessing,
  onPaymentComplete,
}: PaymentGatewayProps) {
  return (
    <div className="flex h-screen w-full flex-col gap-4 px-4 pb-[1vw] lg:gap-6 lg:px-0">
      <div className="flex flex-col items-center justify-center gap-2 border-gray py-3 lg:flex-row lg:border-b">
        <Subtitle
          text="درگاه پرداخت اینترنتی |"
          weight="medium"
          size="xl"
          color="danger"
        />
        <Subtitle
          text={` پرداخت الکترونیک ${bankName}`}
          weight="medium"
          size="xl"
          color="danger"
        />
      </div>
      <div className="flex h-full flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="hidden lg:block lg:flex-3"></div>
        <div className="order-2 flex-4 rounded-sm border border-gray lg:order-0">
          <div className="flex items-center border-b border-gray px-4 py-5 lg:px-6 lg:py-9">
            <Text
              text=" اطلاعات کارت خود را وارد کنید."
              size="md"
              weight="regular"
            />
          </div>
          <div className="flex flex-col gap-4 p-5 lg:p-9">
            <input
              type="text"
              placeholder="شماره کارت"
              className="rounded border p-2"
              dir="ltr"
            />
            <input
              type="text"
              placeholder="رمز یکبار مصرف"
              className="rounded border p-2"
              dir="ltr"
            />
            <button
              onClick={onPaymentComplete}
              disabled={isProcessing}
              className="h-12 cursor-pointer rounded-sm bg-danger text-white disabled:opacity-50"
            >
              {isProcessing ? "در حال پرداخت..." : "پرداخت نهایی"}
            </button>
          </div>
        </div>
        <div className="order-1 flex flex-3 flex-col rounded-sm border border-gray lg:order-0">
          <div className="flex flex-row items-center justify-between border-b border-gray px-4 py-5 lg:px-6 lg:py-9">
            <Text
              text="زمان باقی‌مانده"
              size="md"
              weight="regular"
              color="success"
            />
            <div className="flex flex-row items-end gap-[0.5vw]">
              <Text text="۰۹:۴۵" size="md" weight="regular" color="success" />
              <ClockIcon color="text-success" size="lg" />
            </div>
          </div>
          <div className="flex flex-row gap-[0.5vw] border-b border-gray px-4 py-6 lg:px-6 lg:py-10">
            <PayIcon color="text-primary" />
            <div className="flex flex-col gap-[0.8vw]">
              <Subtitle
                text={`${finalPrice.toLocaleString()} ریال`}
                size="xl"
                weight="medium"
              />
              <Text
                size="sm"
                text="مبلغ قابل پرداخت"
                weight="regular"
                color="gray"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 p-4 lg:gap-9 lg:p-6">
            <div className="flex flex-row justify-between">
              <Text size="sm" text="شماره پذیرنده" weight="regular" />
              <Text size="sm" text="۷۱۴۸۷۶۵۴" weight="regular" />
            </div>
            <div className="flex flex-row justify-between">
              <Text size="sm" text="شماره ترمینال" weight="regular" />
              <Text size="sm" text="۷۱۴۸۷۶۵۴" weight="regular" />
            </div>
            <div className="flex flex-row justify-between">
              <Text size="sm" text="نوع عملیات" weight="regular" />
              <Text size="sm" text="خرید" weight="regular" />
            </div>
            <div className="flex flex-row justify-between">
              <Text size="sm" text="وب سایت فروشگاه" weight="regular" />
              <Text size="sm" text="https://bonami.com" weight="regular" />
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:flex-2"></div>
      </div>
    </div>
  );
}
