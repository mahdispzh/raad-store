"use client";

import { getImageUrl } from "@/src/shared/components/cart-item-card/cart-item-card.constants";
import { RulerIcon } from "@/src/shared/constants/icons";
import { Price, Text } from "@/src/shared/ui";
import Image from "next/image";
import { PaymentSuccessItemProps } from "../../_types/payment.types";

export function PaymentSuccessItem({
  imageSrc,
  title,
  price,
  size,
  color,
  quantity,
}: PaymentSuccessItemProps) {
  const imageUrl = getImageUrl(imageSrc, false);
  return (
    <div className="flex h-[10vw] w-full flex-row items-center justify-between rounded-xs border border-gray px-[3vw] py-[5vw] lg:px-[1vw] lg:py-[1vw]">
      <div className="flex flex-row items-center gap-[1vw]">
        {/* عکس واکنش‌گرا با vw */}
        <Image
          src={imageUrl}
          alt={title}
          width={70}
          height={88}
          className="h-[8vw] w-[6vw] rounded-xs object-cover lg:h-[7vw] lg:w-[5.5vw]"
          quality={100}
        />

        <div className="flex flex-col gap-[0.3vw]">
          {/* عنوان و تعداد */}
          <div className="flex flex-row gap-[0.5vw]">
            <Text text={title} size="lg" weight="medium" />
            <Text text={`×${quantity}`} size="lg" color="gray" />
          </div>

          {/* سایز و رنگ */}
          <div className="flex flex-row items-center gap-[0.5vw]">
            {size && (
              <div className="flex flex-row items-center gap-[0.3vw]">
                <RulerIcon size="md" color="text-primary" />
                <Text text={size} size="sm" />
              </div>
            )}

            {color && (
              <span
                className="rounded-full border-0"
                style={{
                  backgroundColor: color,
                  width: "1.2vw",
                  height: "1.2vw",
                }}
              />
            )}
          </div>
        </div>
      </div>

      <Price price={price} size="xl" />
    </div>
  );
}
