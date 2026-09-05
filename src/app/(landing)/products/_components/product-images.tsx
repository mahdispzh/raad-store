"use client";
import { LikeFilledIcon, LikeIcon } from "@/src/shared/constants/icons";
import { useAuthStore } from "@/src/shared/store/store";
import { SliderButton } from "@/src/shared/ui";
import { ShareButton } from "@/src/shared/ui/share-button/share-button";
import Image from "next/image";
import { useState } from "react";
import { toggleLikeProduct } from "../_services/like-product.api";
import { ProductImagesProps } from "../_types/landing-product.types";

export function ProductImages({
  images,
  alt = "product",
  userId,
  slug,
  isLiked: initialIsLiked = false,
}: ProductImagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isProcessing, setIsProcessing] = useState(false);

  const isLoggedIn = !!useAuthStore((state) => state.user)?.id;

  const total = images.length;
  const mainImage = images?.[activeIndex] || "";

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      alert("برای لایک کردن ابتدا وارد حساب کاربری خود شوید.");
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
      console.error("❌ خطا در لایک:", error);
      alert("خطا در ثبت لایک. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full p-2 md:p-4">
      <div className="relative w-full p-2 pb-0 md:p-[2vw]">
        <div className="relative aspect-[4/5] w-full sm:aspect-square md:aspect-[4/5]">
          <Image
            src={mainImage}
            alt={alt}
            fill
            className="rounded-2xl object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-3 md:top-10 md:right-10 lg:top-15 lg:right-15">
          <div
            className={`cursor-pointer ${isProcessing ? "opacity-60" : ""}`}
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <LikeFilledIcon color="text-secondary" size="lg" />
            ) : (
              <LikeIcon color="text-secondary" size="lg" />
            )}
          </div>
          <div className="cursor-pointer">
            <ShareButton size="lg" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <SliderButton
          count={total}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
      </div>
    </div>
  );
}
