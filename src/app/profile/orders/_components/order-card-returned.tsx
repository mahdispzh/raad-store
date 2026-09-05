// src/app/profile/orders/_components/ui/order-card-returned.tsx
import { CalendarIcon } from "@/src/shared/constants/icons/calendar-icon";
import { DiscountBoxIcon } from "@/src/shared/constants/icons/discount-box-icon";
import { DropleftArrowIcon } from "@/src/shared/constants/icons/dropleft-arrow-icon";
import { OrderIcon } from "@/src/shared/constants/icons/order-icon";
import { ReturnIcon } from "@/src/shared/constants/icons/return-icon";
import { TicketIcon } from "@/src/shared/constants/icons/ticket-icon";
import { Text } from "@/src/shared/ui";
import Image from "next/image";
import { OrderCardReturnedProps } from "../_types/order.types";

export function OrderCardReturned({
  date = "۵ اردیبهشت ۱۴۰۵",
  orderCode = "۶۵۴۳۷۸۲",
  totalPrice = "۶,۸۹۰,۰۰۰",
  discount = "۱,۲۰۰,۰۰۰",
  productImages = ["/images/image31.svg", "/images/image31.svg", "/images/image31.svg"],
}: OrderCardReturnedProps) {
  const orderInfo = [
    { icon: CalendarIcon, text: date },
    { icon: OrderIcon, text: `کد سفارش: ${orderCode}` },
    { icon: TicketIcon, text: `مبلغ: ${totalPrice}` },
    { icon: DiscountBoxIcon, text: `تخفیف: ${discount}` },
  ];

  return (
    <div className="menu-item-border flex flex-col">
      <div className="menu-item-padding flex items-center border-b-2 border-gray">
        <div className="flex items-center gap-1">
          <ReturnIcon size="sm" color="text-danger" />
          <Text text="مرجوع شده" size="md" weight="medium" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="gap-layout menu-item-padding flex flex-col items-start">
          <div className="gap-layout flex flex-wrap">
            {orderInfo.map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <item.icon color="text-gray" size="sm" />
                <Text text={item.text} size="sm" weight="regular" />
              </div>
            ))}
          </div>

          <div className="gap-layout flex overflow-y-auto py-2">
            {productImages.map((src, i) => (
              <Image key={i} src={src} alt="product" width={67} height={84} className="rounded-xs" />
            ))}
          </div>

          <div className="flex w-full cursor-pointer items-center justify-end gap-2">
            <Text text="مشاهده ی فاکتور" size="md" weight="regular" color="danger" />
            <DropleftArrowIcon size="xs" color="text-danger" />
          </div>
        </div>
      </div>
    </div>
  );
}