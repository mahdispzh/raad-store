"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_SECTION_PADDING } from "../../_constants/landing.constants";

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="mt-4 flex flex-col gap-2 px-2">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-2/3 rounded" />
          <Skeleton className="h-4 w-10 rounded" />
        </div>

        <div className="flex items-center justify-between px-2">
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

function ProductSliderSkeleton({
  count = 6,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="pt-10">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

interface ProductSectionSkeletonProps {
  className?: string;
  titleClassName?: string;
  sliderClassName?: string;
  sectionPadding?: string;
  count?: number;
}

export function ProductSectionSkeleton({
  className = "",
  titleClassName = "",
  sliderClassName = "",
  sectionPadding = DEFAULT_SECTION_PADDING,
  count = 6,
}: ProductSectionSkeletonProps) {
  return (
    <section className={`w-full py-8 ${className}`}>
      <div
        className={`mb-8 flex justify-start ${sectionPadding} ${titleClassName}`}
      >
        <Skeleton className="h-7 w-40 rounded" />
      </div>

      <div className={sectionPadding}>
        <ProductSliderSkeleton className={sliderClassName} count={count} />
      </div>
    </section>
  );
}
