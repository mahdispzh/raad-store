// payment-status-failed-like.ui.tsx
"use client";

import Image from "next/image";

import { DefaultButton, Subtitle, Text } from "@/src/shared/ui";
import { PaymentFailedLikeProps } from "../../_types/payment-status.types";
import { FAILED_LIKE_VARIANTS } from "../../_constants/payment-status.constants";

interface Props extends PaymentFailedLikeProps {
  variant: "unsuccess" | "unknown";
}

/**
 * ساختار مشترک بین حالت "ناموفق" و "نامشخص".
 * فقط رنگ/متن/آیکون از روی config مربوط به variant انتخاب می‌شه.
 */
export function PaymentStatusFailedLike({
  variant,
  orderNumber,
  refundNote = "چنانچه مبلغی از حساب شما کسر شده است، تا ۷۲ ساعت آینده به حساب شما باز خواهد گشت.",
  details,
  onRetryPayment,
  onChangePaymentMethod,
}: Props) {
  const config = FAILED_LIKE_VARIANTS[variant];

  return (
    <div className="flex w-full flex-col gap-4">
      {/* بخش بالا: وضعیت پرداخت */}
      <div className="rounded-xs border border-gray p-5 lg:p-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row-reverse sm:items-start sm:text-right">
          <div className="flex flex-1 flex-col items-center sm:items-start">
            <div className="flex shrink-0 justify-center">
              <Image
                src={config.imageSrc}
                alt={config.imageAlt}
                width={250}
                height={250}
                className="h-40 w-40 shrink-0"
              />
            </div>

            <Subtitle text={config.title} color={config.titleColor} size="2xl" />

            <div className="mt-2 flex items-center gap-1">
              <Text text="شماره سفارش" size="sm" color="secondary" />
              <Text
                text={orderNumber}
                size="sm"
                color="secondary"
                weight="medium"
              />
            </div>

            <div className="mt-3 max-w-2xl">
              <Text text={config.message} size="md" color="primary" />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <div className="flex h-10 w-36 flex-row gap-2">
                <DefaultButton
                  type={config.buttonType}
                  style="fill"
                  label="پرداخت دوباره"
                  action={onRetryPayment}
                />
                <DefaultButton
                  type={config.buttonType}
                  style="outline"
                  label="تغییر روش پرداخت"
                  action={onChangePaymentMethod}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش پایین: جزئیات پرداخت */}
      <div className="flex flex-col gap-8 rounded-xs border border-gray p-4 lg:p-5">
        <div className="flex items-center justify-center gap-2 text-center">
          <Text text={refundNote} size="md" color="secondary" />
        </div>

        <div className="flex flex-col items-center gap-5">
          <Subtitle text="جزئیات پرداخت" size="xl" color="primary" />

          <div className="flex w-full flex-col gap-2">
            {/* هدر */}
            <div className="flex items-center pb-1">
              <div className="flex-1 text-right">
                <Text text="درگاه" size="sm" color="secondary" />
              </div>
              <div className="flex-1 text-center">
                <Text text="شماره پیگیری" size="sm" color="secondary" />
              </div>
              <div className="flex-1 text-left">
                <Text text="تاریخ" size="sm" color="secondary" />
              </div>
            </div>

            {/* ردیف‌ها */}
            {details.map((row, index) => (
              <div key={index} className="flex items-center py-1">
                <div className="flex-1 text-right">
                  <Text text={row.gateway} size="md" color="primary" />
                </div>
                <div className="flex-1 text-center">
                  <Text text={row.trackingCode} size="md" color="primary" />
                </div>
                <div className="flex-1 text-left">
                  <Text text={row.date} size="md" color="primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
