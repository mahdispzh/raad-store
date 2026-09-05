// src/app/profile/orders/_components/ui/order-details-header.tsx
import { FactorBookIcon } from "@/src/shared/constants/icons/factor-book-icon";
import { RightArrowIcon } from "@/src/shared/constants/icons/right-arrow-icon";
import { TruckIcon } from "@/src/shared/constants/icons/truck-icon";
import { Dot, Subtitle, Text, Price } from "@/src/shared/ui";
import Link from "next/link";
import { OrderDetailsHeaderProps } from "../_types/order.types";

export function OrderDetailsHeader({
  orderId = "1",
  trackingCode = "۴۵۶۷۹۸۲۳",
  orderDate = "۷ بهمن ۱۴۰۴",
  recipient = "هدیه کرونی",
  phone = "۰۹۱۷۰۵۸۶۰۶۷",
  totalPrice = 2890000,
  address = "شیراز, شهرک آرین, پارک علم و فناوری",
  deliveryDate = "چهارشنبه ۱۷ بهمن ۱۴۰۴",
  shippingMethod = "ارسال پست پیشتاز",
  currentStep = "2",
}: OrderDetailsHeaderProps) {
  return (
    <div className="menu-item-border flex flex-col">
      <div className="menu-item-padding flex items-center justify-between border-b-2 border-gray">
        <Link href="/profile/orders" className="flex items-center gap-2">
          <RightArrowIcon size="md" />
          <Subtitle text="جزییات سفارش" size="xl" />
        </Link>
        <Link href={`/profile/orders/${orderId}/invoice`} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <FactorBookIcon size="md" color="text-danger" />
            <Text text="مشاهده فاکتور" size="md" color="danger" />
          </div>
        </Link>
      </div>

      <div className="gap-layout menu-item-padding flex items-center border-b-2 border-gray">
        <Text text={`کد پیگیری سفارش: ${trackingCode}`} size="md" />
        <Dot size="sm" />
        <Text text={`تاریخ ثبت سفارش: ${orderDate}`} size="md" />
      </div>

      <div className="gap-layout menu-item-padding flex flex-col border-b-2 border-gray">
        <div className="gap-layout flex">
          <div className="gap-layout flex items-center">
            <Text text={`تحویل گیرنده: ${recipient}`} />
            <Dot />
            <Text text={`شماره موبایل: ${phone}`} />
            <Dot />
            <Price price={totalPrice} />
          </div>
        </div>
        <Text text={`آدرس: ${address}`} />
      </div>

      <div className="menu-item-padding flex flex-col sm:flex-row gap-layout items-center justify-between">
        <div className="gap-layout flex flex-col md:flex-row items-center">
          <Text text={`تحویل به مشتری: ${deliveryDate}`} />
          <Dot size="sm" className="hidden md:block" />
          <div className="flex items-center gap-1">
            <TruckIcon size="md" />
            <Text text={shippingMethod} />
          </div>
        </div>
      </div>
    </div>
  );
}