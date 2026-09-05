"use client";

import { Skeleton } from "@/components/ui/skeleton";


function FiltersContainerSkeleton() {
  return (
    <div className="h-auto flex-1 self-start rounded-sm border border-gray">
      <div className="flex justify-between border-b border-gray p-[1.5vw]">
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-20 rounded" />
      </div>

      <div className="flex flex-col gap-[1vw] px-[1vw] py-[1.5vw]">
        {/* ردیف فیلتر قیمت */}
        <div className="flex justify-between px-[0.5vw]">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
        </div>

        <div className="h-px bg-gray" />

        {/* ردیف فیلتر رنگ */}
        <div className="flex justify-between px-[0.5vw]">
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
        </div>
      </div>

      <div className="p-[1vw] px-[1.5vw] py-[1.5vw]">
        <Skeleton className="h-[2.5vw] w-full rounded-xs" />
      </div>
    </div>
  );
}

function SortBarSkeleton() {
  return (
    <div className="flex w-full flex-row items-center gap-[1.5vw] border-b border-gray p-[1vw]">
      <Skeleton className="h-4 w-20 rounded" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-16 rounded" />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-4 w-10 rounded" />
      </div>
    </div>
  );
}

export function ProductsListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="flex items-start gap-[2vw] p-[2vw]">
      <div className="sticky top-35 mt-2 w-[20vw] self-start">
        <FiltersContainerSkeleton />
      </div>

      <div className="mt-2 flex flex-1 flex-col gap-10">
        <SortBarSkeleton />

        <div className="grid w-full grid-cols-1 gap-[4vw] rounded-sm border border-gray px-[2vw] py-[2vw] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
