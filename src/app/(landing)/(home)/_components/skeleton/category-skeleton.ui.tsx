"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { IMAGE_CONTAINER_CLASS } from "../../_constants/landing.constants";


function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={IMAGE_CONTAINER_CLASS}>
        <Skeleton className="h-full w-full rounded-md" />
      </div>
      <Skeleton className="h-4 w-20 rounded" />
    </div>
  );
}

export function CategorySliderSkeleton() {
  return (
    <div className="w-full">
      <div className="pt-10 pb-10 text-center">
        <Skeleton className="mx-auto h-8 w-56 rounded" />
      </div>

      <div className="flex justify-center gap-6 overflow-hidden px-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>

      <div className="mt-15 flex justify-center">
        <div className="h-[0.05vw] w-[76vw] bg-gray"></div>
      </div>
    </div>
  );
}
