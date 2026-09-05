"use client";

import { CategorySliderSkeleton } from "./category-skeleton.ui";
import { CustomSliderSkeleton } from "./custom-slider-skeleton.ui";
import { ProductSectionSkeleton } from "./product-skeleton.ui";

export function HomeSkeleton() {
  return (
    <div className="w-full">
      <CustomSliderSkeleton />

      <div className="py-8" />

      <CategorySliderSkeleton />

      <div className="py-12" />

      {/* latest */}
      <ProductSectionSkeleton />

      {/* most popular */}
      <ProductSectionSkeleton />

      {/* best selling */}
      <ProductSectionSkeleton />

      {/* special sale (featured title) */}
      <ProductSectionSkeleton />
    </div>
  );
}
