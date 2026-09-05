// src/app/profile/orders/_components/ui/order-details-card.tsx
import { OutlineStarIcon } from "@/src/shared/constants/icons/outline-star-icon";
import { BadgeNumber, Dot, Text } from "@/src/shared/ui";
import { ButtonComment } from "./button-comment";
import Image from "next/image";
import { OrderDetailsCardProps } from "../_types/order.types";

export function OrderDetailsCard({
  shipmentNumber = 1,
  totalShipments = 4,
  productImage = "/images/image34.svg",
  quantity = 2,
  productName = "کت و دامن زنانه",
  purchasedPrice = "۲,۸۹۰,۰۰۰",
  currentPrice = "۲,۸۹۰,۰۰۰",
    productSlug, // ✅ اضافه شد

}: OrderDetailsCardProps) {
  return (
    <div className="menu-item-border flex flex-col">
      <div className="menu-item-padding flex items-center gap-2 border-b-2 border-gray">
        <Text text={`محصول ${shipmentNumber} از ${totalShipments}`} size="md" />
        <Dot />
      </div>

      <div className="flex items-end justify-between">
        <div className="gap-layout menu-item-padding flex">
          <div className="relative flex-shrink-0">
            <Image src={productImage} alt="product" width={184} height={230} className="rounded-sm" />
            <div className="absolute bottom-0 left-0 z-10 translate-x-[-50%] translate-y-1/2">
              <BadgeNumber variant="circle" size="lg" value={quantity} />
            </div>
          </div>

          <div className="gap-layout flex flex-col">
            <div className="gap-layout flex flex-col border-b-2 border-gray py-6">
              <Text text={productName} size="lg" weight="bold" />
              <Text text={`قیمت خریداری شده: ${purchasedPrice}`} size="md" />
            </div>
            <Text text={`قیمت فعلی: ${currentPrice}`} size="md" />
          </div>
        </div>

        <div className="menu-item-padding gap-layout flex flex-col items-end">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <OutlineStarIcon key={i} size="sm" />
            ))}
          </div>
          <ButtonComment productSlug={productSlug} /> {/* ✅ اصلاح شد */}
        </div>
      </div>
    </div>
  );
}