"use client";

import { Caption, DefaultButton, Text } from "@/src/shared/ui";
import { getFakePaymentDetail } from "../_constants/payment-detail-data";
import { CheckIcon } from "@/src/shared/constants/icons";
import { CurrencyIcon } from "@/src/shared/constants/icons/currency-icon";

export const description = "ستون کناری تاریخچه‌ی رویدادهای یک تراکنش، جدا از کامپوننت اصلی جزئیات";

interface SideDetailsProps {
  paymentId: string;
}

export function SideDetails({ paymentId }: SideDetailsProps) {
  const detail = getFakePaymentDetail(paymentId);

  // تابع کمکی برای تعیین آیکون مناسب
  const getIcon = (index: number, variant: string) => {
    // دو تا اولی (index 0 و 1) => CurrencyIcon
    if (index === 0) {
      return <CurrencyIcon size="sm" color="text-pure-white" />;
    }
    if (index === 1) {
      return <CurrencyIcon size="sm" color="text-success" />;
    }
    // بقیه (index 2 و 3) => CheckIcon
    return <CheckIcon size="sm" color="text-pure-white" />;
  };

  return (
    <div className="flex flex-col rounded-sm bg-pure-white p-5 shadow-xl">
      <Text text="تاریخچه تراکنش" size="lg" color="primary" weight="bold" />

      <div className="flex flex-col pt-5">
        {detail.timeline.map((event, index) => (
          <div key={event.id} className="flex flex-row gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  event.variant === "success" ? "bg-success" : "bg-gray"
                }`}
              >
                {getIcon(index, event.variant)}
              </span>
              {index !== detail.timeline.length - 1 && <span className="w-px flex-1 bg-accent" />}
            </div>

            <div className={index !== detail.timeline.length - 1 ? "pb-6" : ""}>
              <Text text={event.title} size="md" color="secondary" weight="medium" />
              {event.refValue && (
                <Text
                  text={`${event.refLabel} ${event.refValue}`}
                  size="md"
                  color="primary"
                  weight="regular"
                />
              )}
              <div className="flex flex-col py-2">
                <Text text={`${event.date}, ${event.time}`} size="md" color="primary" weight="regular" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <DefaultButton label="+ یادداشت" style="outline" type="secondary" action={() => {}} />
      </div>
    </div>
  );
}