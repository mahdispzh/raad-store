// src/app/profile/orders/_components/ui/order-card-delivered.tsx
import { CalendarIcon } from "@/src/shared/constants/icons/calendar-icon";
import { DiscountBoxIcon } from "@/src/shared/constants/icons/discount-box-icon";
import { DropleftArrowIcon } from "@/src/shared/constants/icons/dropleft-arrow-icon";
import { OrderIcon } from "@/src/shared/constants/icons/order-icon";
import { TicketIcon } from "@/src/shared/constants/icons/ticket-icon";
import { CheckBoldIcon } from "@/src/shared/constants/icons/check-bold-icon";
import { Text } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { OrderCardDeliveredProps } from "../_types/order.types";

export function OrderCardDelivered({
  status = "تحویل شده",
  statusIcon: StatusIcon = CheckBoldIcon,
  date = "۵ اردیبهشت ۱۴۰۵",
  orderCode = "۶۵۴۳۷۸۲",
  totalPrice = "۶,۸۹۰,۰۰۰",
  discount = "۱,۲۰۰,۰۰۰",
  productImages = ["/images/image31.svg", "/images/image31.svg", "/images/image31.svg"],
  orderId = "1",
}: OrderCardDeliveredProps) {
  const orderMeta = [
    { icon: CalendarIcon, text: date },
    { icon: OrderIcon, text: `کد سفارش: ${orderCode}` },
    { icon: TicketIcon, text: `مبلغ: ${totalPrice}` },
    { icon: DiscountBoxIcon, text: `تخفیف: ${discount}` },
  ];

  return (
    <div className="menu-item-border flex flex-col">
      <div className="menu-item-padding flex items-center justify-between border-b-2 border-gray">
        <div className="flex items-center gap-2">
          <div className="rounded-full border-2 border-success p-[2px]">
            <StatusIcon size="xs" color="text-success" />
          </div>
          <Text text={status} size="md" weight="medium" />
        </div>
        <Link href={`/profile/orders/${orderId}`} className="flex items-center gap-2">
          <DropleftArrowIcon size="sm" color="text-danger" />
        </Link>
      </div>

      <div className="menu-item-padding gap-layout flex flex-col">
        <div className="gap-layout flex flex-wrap">
          {orderMeta.map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <item.icon size="sm" color="text-gray" />
              <Text text={item.text} size="sm" />
            </div>
          ))}
        </div>

        <div className="gap-layout flex py-2 overflow-y-auto">
          {productImages.map((src, i) => (
            <Image key={i} src={src} alt="product" width={67} height={84}  className="rounded-xs" />
          ))}
        </div>

        <Link
  href={`/profile/orders/${orderId}/invoice`}
  className="flex cursor-pointer items-center justify-end gap-2"
>
  <Text text="مشاهده ی فاکتور" size="md" color="danger" />
  <DropleftArrowIcon size="xs" color="text-danger" />
</Link>
      </div>
    </div>
  );
}