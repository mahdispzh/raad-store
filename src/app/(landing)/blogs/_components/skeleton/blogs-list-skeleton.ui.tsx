"use client";

import { Skeleton } from "@/components/ui/skeleton";


function BlogCardSkeleton({ isLast = false }: { isLast?: boolean }) {
  return (
    <div
      className={`gap-layout flex flex-col py-8 ${!isLast ? "border-b border-gray" : ""}`}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48 rounded" />
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>

      <div className="gap-layout flex">
        <div className="w-[219px] shrink-0 overflow-hidden rounded-xl">
          <Skeleton className="aspect-[219/208] h-auto w-full" />
        </div>

        <div className="gap-layout flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </div>

            <Skeleton className="h-4 w-24 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogsListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="gap-layout flex w-full flex-col">
      {/* فیلترها */}
      <div className="mt-11 flex items-center justify-center gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[45px] w-[170px] rounded-full" />
        ))}
      </div>

      <div className="flex flex-col">
        {Array.from({ length: count }).map((_, i) => (
          <BlogCardSkeleton key={i} isLast={i === count - 1} />
        ))}
      </div>
    </div>
  );
}
