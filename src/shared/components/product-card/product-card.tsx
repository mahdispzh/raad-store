"use client";

import { LoginFlowModal } from "@/src/app/(landing)/products/_components/login-flow-modal";
import { toggleLikeProduct } from "@/src/app/(landing)/products/_services/like-product.api";
import { Badge, DefaultButton, Price, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { LikeIcon } from "../../constants/icons/like-icon";
import { useAuthStore } from "../../store/store";
import { StyledButton } from "../../ui/styled-button/styled-button.ui";
import { ProductCardProps } from "./product-card.types";
import { useProductCard } from "./useProductCard";

export function ProductCard(props: ProductCardProps) {
  const {
    slug,
    title,
    imageSrc,
    price,
    discount,
    rating,
    isLiked: initialIsLiked = false,
  } = props;

  const { handleViewProduct } = useProductCard(props);

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isProcessing, setIsProcessing] = useState(false);

  const isLoggedIn = !!useAuthStore((state) => state.user)?.id;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);

    const prevIsLiked = isLiked;
    setIsLiked(!prevIsLiked);

    try {
      const result = await toggleLikeProduct(slug);
      setIsLiked(result.liked);
    } catch (error) {
      setIsLiked(prevIsLiked);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex w-full min-w-0 flex-col justify-between gap-3 rounded-sm transition-all duration-300 hover:-translate-y-2">
      <div className="flex w-full min-w-0 flex-col gap-3">
        {/* تصویر */}
        <div
          className="relative h-[225px] w-full cursor-pointer overflow-hidden rounded-sm"
          onClick={handleViewProduct}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform hover:scale-105"
          />
        </div>

        {/* عنوان و امتیاز */}
        <div className="flex min-w-0 items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Text
              text={title}
              size="md"
              weight="medium"
              // className="truncate"
            />
          </div>
          {rating !== undefined && (
            <div className="shrink-0">
              <Badge type="rating" rating={rating} />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-col gap-3">
        {/* قیمت */}
        <div className="flex justify-end">
          <Price
            price={price}
            size="lg"
            {...(discount !== undefined && { discount })}
          />
        </div>

        {/* دکمه‌ها */}
        <div className="mt-2 flex w-full min-w-0 flex-row items-stretch gap-1">
          <div className="min-w-0 flex-1">
            <DefaultButton
              type="primary"
              style="outline"
              label="مشاهده "
              action={handleViewProduct}
            />
          </div>
          <div className="aspect-square h-auto shrink-0 [&>button]:h-full [&>button]:w-full">
            <StyledButton
              variant="toggleIcon"
              select={isLiked}
              icon={isLiked ? <LikeIcon size="md" /> : <LikeIcon size="md" />}
              action={handleLikeClick}
            />
          </div>
        </div>
      </div>
      <LoginFlowModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          handleLikeClick();
        }}
      />
    </div>
  );
}
