// payment-status.ui.tsx
"use client";

import { Subtitle } from "@/src/shared/ui";
import { PaymentSuccessInfo } from "./payment-success-info";
import { PaymentStatusFailedLike } from "./payment-status-failed-like.ui";
import { PaymentStatusProps } from "../../_types/payment-status.types";
import { PaymentSuccessItem } from "./payment-success-item";

/**
 * نقطه‌ی واحد ورود برای نمایش وضعیت پرداخت.
 * بر اساس type تصمیم می‌گیره کدوم نسخه (success / unsuccess / unknown) رندر شه.
 *
 * استفاده:
 *   <PaymentStatus type="success" success={{ info, products }} />
 *   <PaymentStatus type="unsuccess" failed={{ orderNumber, details, onRetryPayment, onChangePaymentMethod }} />
 *   <PaymentStatus type="unknown" failed={{ orderNumber, details, onRetryPayment, onChangePaymentMethod }} />
 */
export function PaymentStatus(props: PaymentStatusProps) {
  if (props.type === "success") {
    const { info, products } = props.success;
console.log("products:", products);
    return (
      <div className="flex flex-col rounded-xs border border-gray p-4 lg:p-5">
        <div className="p-2 lg:pb-5">
          <Subtitle text="وضعیت پرداخت" size="2xl" weight="medium" />
        </div>
        <div className="flex h-auto w-full flex-col gap-5 lg:flex-row lg:gap-7">
          <div className="order-2 flex-2 lg:order-0">
            <PaymentSuccessInfo {...info} />
          </div>
          <div className="order-1 flex flex-5 flex-col gap-3 lg:order-0 lg:gap-7">
         {products.map((p) => (
  <PaymentSuccessItem
    key={p.id}
    id={p.id}
    imageSrc={p.imageSrc}
    title={p.title}
    price={p.price}
    quantity={p.quantity}
    {...(p.size !== undefined && { size: p.size })}
    {...(p.color !== undefined && { color: p.color })}
  />
))}

          </div>
        </div>
      </div>
    );
  }

  // unsuccess و unknown ساختار یکسانی دارن، فقط variant فرق می‌کنه
  return <PaymentStatusFailedLike variant={props.type} {...props.failed} />;
}
