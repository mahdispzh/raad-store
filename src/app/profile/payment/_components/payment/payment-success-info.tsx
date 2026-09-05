// src/app/profile/payment/_components/payment-success-info.tsx

"use client";
import { PhoneIcon } from "@/src/shared/constants/icons/phone-icon";
import { DefaultButton, Price, Text } from "@/src/shared/ui";
import { useRouter } from "next/navigation"; // ✅ استفاده از next/navigation
import { PaymentSuccessInfoProps } from "../../_types/payment.types";

export function PaymentSuccessInfo({
  trackingCode,
  dateTime,
  paymentStatus,
  totalPrice,
  receiverName,
  phone,
  address,
  shippingMethod,
  postalCode,
}: PaymentSuccessInfoProps) {
  const router = useRouter();

  const handleGoToOrders = () => {
    router.push("/profile/orders");
  };

  return (
    <div className="flex flex-2 flex-col gap-5 lg:gap-7">
      <div className="flex h-auto w-full flex-col gap-6 rounded-xs border border-gray p-4 lg:gap-9 lg:p-6">
        <div className="flex flex-row">
          <div className="flex flex-1 items-start">
            <Text text="شماره پیگیری" size="md" weight="medium" />
          </div>
          <div className="flex flex-1 items-start">
            <Text text={trackingCode} size="md" weight="medium" />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1 items-start">
            <Text text="تاریخ و ساعت" size="md" weight="medium" />
          </div>
          <div className="flex flex-1 items-start">
            <Text text={dateTime} size="md" weight="medium" />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-1 items-start">
            <Text text="وضعیت پرداخت" size="md" weight="medium" />
          </div>
          <div className="flex flex-1 items-start">
            <Text text={paymentStatus} size="md" weight="medium" />
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-1 items-start">
            <Text text="جمع کل" size="md" weight="medium" />
          </div>
          <div className="flex flex-1 items-start">
            <Price price={totalPrice} size="xl" />
          </div>
        </div>
      </div>
      <div className="flex h-auto w-full flex-col gap-9 rounded-xs border border-gray p-4 lg:p-6">
        <div className="flex flex-row justify-between">
          <Text
            text={`تحویل گیرنده: ${receiverName}`}
            size="sm"
            weight="medium"
          />
          <div className="flex flex-row">
            <Text text={phone} size="sm" weight="medium" />
            <PhoneIcon size="md" />
          </div>
        </div>
        <Text text={address} size="md" weight="regular" />
        <div className="flex flex-col gap-[1vw]">
          <div className="flex flex-row justify-between">
            <Text text="روش ارسال" size="md" weight="regular" />
            <Text text={shippingMethod} size="md" weight="regular" />
          </div>
          <div className="flex flex-row justify-between">
            <Text text="کد پستی" size="md" weight="regular" />
            <Text text={postalCode} size="md" weight="regular" />
          </div>
        </div>
      </div>
      <DefaultButton
        type="primary"
        style="fill"
        label="پیگیری سفارشات"
        action={handleGoToOrders}
      />
    </div>
  );
}
