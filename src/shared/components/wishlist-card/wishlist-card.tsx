"use client";

import { DefaultButton, Price, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useWishlistCard } from "./useWishlistCard";
import { WishlistCardProps } from "./wishlist-card.types";

export function WishlistCard(props: WishlistCardProps) {
  const { title, imageSrc, price, discount, onRemoveFromWishlist } = props;
  const { handleViewProduct } = useWishlistCard(props);

  return (
    <div className="flex h-auto w-full min-w-0 flex-col justify-between gap-4">
      <div
        className="flex w-full cursor-pointer flex-col gap-3"
        onClick={handleViewProduct}
      >
        <div className="relative aspect-square w-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            className="rounded-sm object-cover transition-transform hover:scale-105"
            quality={100}
          />
        </div>
        <div className="flex w-full min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <Text text={title} weight="medium" size="lg" />
          </div>
          <Price
            price={price}
            size="lg"
            {...(discount !== undefined && { discount })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <DefaultButton
          type="primary"
          style="outline"
          label="مشاهده محصول"
          action={handleViewProduct}
        />
        <DefaultButton
          type="primary"
          style="fill"
          label="حذف از علاقه مندی ها"
          action={onRemoveFromWishlist ?? (() => {})}
        />
      </div>
    </div>
  );
}
