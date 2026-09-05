"use client";

import { ImageOffIcon } from "@/src/shared/constants/icons/image-off-icon";
import { Badge, Price, Text } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { useProductCard } from "../_hooks/useLanding";
import type { ProductCardProps } from "../_types/landing.types";

export function ProductCard({
  id,
  slug,
  image,
  title,
  price,
  stock = 1,
  discount,
  isNew = false,
  rating = 0,
  href,
}: ProductCardProps) {
  const { imageError, handleImageError } = useProductCard();
  const isOutOfStock = !stock || stock <= 0;
  const hasValidImage = !imageError && image?.trim();
  
  const finalHref = href || `/products/${slug || id}`;

  return (
    <Link href={finalHref} className="group flex cursor-pointer flex-col">
      <div className="relative block aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-100">
        {hasValidImage ? (
          <Image
            src={image!}
            alt={title || "تصویر محصول"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            <ImageOffIcon size="2xl" color="text-accent" />
            <Text text="تصویر موجود نیست" size="sm" color="secondary" />
          </div>
        )}
        {isNew && (
          <div className="absolute top-4 left-0 z-10">
            <Badge type="new" iconSize="xl" />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 px-2">
        <div className="flex items-center justify-between gap-2">
          <Text text={title || "بدون عنوان"} size="md" weight="medium" color="primary" />
          <Badge type="rating" rating={rating} />
        </div>

        <div className="flex items-center justify-between px-2">
          {isOutOfStock ? (
            <Text text="ناموجود" size="md" weight="medium" color="danger" />
          ) : discount && discount > 0 ? (
            <>
              <Badge type="discount" label={`${discount}%`} />
              <Price price={price!} discount={discount} />
            </>
          ) : (
            <Price price={price!} />
          )}
        </div>
      </div>
    </Link>
  );
}