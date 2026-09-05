// src/app/profile/orders/_components/ui/order-shipment-item.tsx
import { TruckIcon } from "@/src/shared/constants/icons/truck-icon";
import { Caption, Dot, Text } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { OrderShipmentItemProps } from "../_types/order.types";

export function OrderShipmentItem({
  isLast = false,
  shipmentNumber = 1,
  totalShipments = 2,
  shippingMethod = "ارسال پست پیشتاز",
  deliveryRange = "دوشنبه ۲۱ - ۲۸ اردیبهشت",
  productImage = "/images/image31.svg",
  productName = "گوشی موبایل سامسونگ مدل Galaxy",
  productFeatures = "رنگ مشکی | حافظه ۲۵۶ گیگ",
    productSlug,

}: OrderShipmentItemProps) {
  return (
    <div className={`gap-layout menu-item-padding flex flex-col ${!isLast ? "border-b-2 border-gray" : ""}`}>
      <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-2">
        <div className="gap-layout flex items-center">
          <div className="flex items-center gap-1">
            <Text text={`محصول ${shipmentNumber} از ${totalShipments}`} size="sm" />
            <Dot />
          </div>
          <div className="flex items-center gap-1">
            <TruckIcon size="md" />
            <Text text={shippingMethod} size="sm" />
          </div>
        </div>
        <Text text={`تحویل بازه ${deliveryRange}`} size="sm" />
      </div>

    <Link
        href={productSlug ? `/products/${productSlug}` : "#"}
        className="flex items-center gap-4"
      >
        <Image src={productImage} alt="product" width={67} height={84} className="rounded-xs" />
        <div className="flex flex-col gap-1">
          <Text text={productName} size="sm" weight="medium" />
          <Caption text={productFeatures} size="xs" />
        </div>
      </Link>
    </div>
  );
}