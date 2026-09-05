"use client";

import {
  CloseIcon,
  LeftArrowIcon,
  QuestionIcon,
  SolidStarIcon,
} from "@/src/shared/constants/icons";
import { Caption, Modal, Subtitle, Text } from "@/src/shared/ui";
import { StyledButton } from "@/src/shared/ui/styled-button/styled-button.ui";
import Image from "next/image";
import { useState } from "react";
import { ProductInfoProps } from "../_types/landing-product.types";
import { FeatureCard } from "./feature-card";

export function ProductInfo({
  title,
  reviewersCount,
  onViewReviews,
  averageRating,
  colors,
  sizes,
  selectedColorId,
  selectedSizeId,
  onSelectColor,
  onSelectSize,
  features = [],
  guidImage,
}: ProductInfoProps) {
  const [showGuide, setShowGuide] = useState(false);
  console.log("features : ", features);
  return (
    <>
      <div className="h-full p-2 md:p-4">
        <div className="p-3 pb-0 md:p-[3vw] md:pb-0 md:pl-[5vw]">
          <Subtitle text={title} size="3xl" />
          <div className="mt-2 h-px w-full bg-gray" />

          <div className="flex flex-row flex-wrap items-center gap-2 py-3 md:gap-[1vw] md:py-[1vw]">
            <div className="flex flex-row items-center gap-2 md:gap-[0.7vw]">
              <div className="flex flex-row items-center gap-0.5">
                <Text text={averageRating.toFixed(1)} size="lg" weight="bold" />
                <div className="-mt-2">
                  <SolidStarIcon size="md" />
                </div>
              </div>
              <Text
                text={`(امتیاز ${reviewersCount} خریدار) `}
                weight="medium"
                size="md"
                color="gray"
              />
            </div>
            <button
              className="flex h-6 w-18 cursor-pointer items-center justify-center gap-1 rounded-lg bg-accent md:gap-[0.2vw]"
              onClick={onViewReviews}
            >
              <Caption
                text={` ${reviewersCount} دیدگاه`}
                size="xs"
                color="primary"
              />
              <LeftArrowIcon size="xs" color="text-primary" />
            </button>
          </div>

          {/* انتخاب رنگ */}
          <div className="py-4 md:py-[2vw]">
            <Text text="رنگ: " color="primary" size="lg" weight="medium" />
            <div className="flex flex-row flex-wrap gap-2 p-2 md:gap-[0.8vw] md:p-[1vw]">
              {colors.map((color) => (
                <StyledButton
                  key={color.id}
                  variant="color"
                  select={selectedColorId === color.id}
                  action={() => onSelectColor(color.id)}
                  color={color.hex_code}
                />
              ))}
            </div>
          </div>
        </div>

        {/* انتخاب سایز */}
        <div className="pt-3 pr-3 md:pt-[1.5vw] md:pr-[3vw]">
          <div className="flex flex-row flex-wrap items-center justify-between gap-2">
            <Text text="سایز:" color="primary" weight="medium" size="lg" />
            <button
              type="button"
              disabled={!guidImage}
              onClick={() => setShowGuide(true)}
              className="flex flex-row items-center gap-1 disabled:opacity-40 md:gap-[0.3vw]"
            >
              <Text
                text="راهنمای محصول"
                weight="regular"
                size="lg"
                color="secondary"
              />
              <div className="-scale-x-100">
                <QuestionIcon size="md" color="text-secondary" />
              </div>
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-2 p-2 md:gap-[0.8vw] md:p-[1vw]">
            {sizes.map((size) => (
              <StyledButton
                key={size.id}
                variant="size"
                select={selectedSizeId === size.id}
                action={() => onSelectSize(size.id)}
                label={size.name}
              />
            ))}
          </div>
        </div>

        {/* ویژگی‌ها */}
        {/* {features.length === 0 && (
          <div className="w-full pt-4 pr-3 md:pt-[2.5vw] md:pr-[3vw]">
            <Text text="ویژگی ها:" color="primary" size="lg" weight="medium" />
            <div className="grid w-full grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:gap-2 md:p-[1vw] xl:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.id ?? index}
                  title={feature.name || "نامشخص"}
                  value={feature.value || "—"}
                />
              ))}
            </div>
          </div>
        )} */}
        {features.length > 0 && (
          <div className="w-full pt-4 pr-3 md:pt-[2.5vw] md:pr-[3vw]">
            <Text text="ویژگی ها:" color="primary" size="lg" weight="medium" />
            <div className="grid w-full grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:gap-2 md:p-[1vw] xl:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.id ?? index}
                  title={feature.name || "نامشخص"}
                  value={feature.value || "—"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {showGuide && guidImage && (
        <Modal isOpen={showGuide} onClose={() => setShowGuide(false)}>
          <div className="flex h-auto w-[92vw] max-w-[614px] flex-col rounded-xs border border-accent bg-white sm:h-[540px]">
            <div className="flex flex-row justify-between border-b border-gray p-4 md:p-6">
              <Text text="راهنمای اندازه" weight="regular" size="lg" />
              <button
                onClick={() => setShowGuide(false)}
                className="cursor-pointer"
              >
                <CloseIcon size="md" />
              </button>
            </div>
            <div className="flex h-[260px] w-full items-center justify-center sm:mx-auto sm:h-[380px] sm:w-[428px]">
              <Image
                src={guidImage!}
                alt="راهنمای سایز"
                width={600}
                height={400}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="flex h-full w-full items-center justify-center p-4">
              <button
                className="mx-auto flex h-12 w-full max-w-[390px] items-center justify-center rounded-xs bg-danger"
                onClick={() => setShowGuide(false)}
              >
                <Text
                  text="متوجه شدم"
                  weight="medium"
                  size="md"
                  color="white"
                />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
