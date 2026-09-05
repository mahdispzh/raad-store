"use client";

import { Skeleton } from "@/components/ui/skeleton";


function ProductImagesSkeleton() {
  return (
    <div className="h-full p-4">
      <div className="relative h-full w-full p-[2vw] pb-0">
        <Skeleton className="h-160 w-full rounded-2xl" />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-2 w-2 rounded-full" />
        ))}
      </div>
    </div>
  );
}

function ProductInfoSkeleton() {
  return (
    <div className="h-full p-4">
      <div className="p-[3vw] pb-0 pl-[5vw]">
        <Skeleton className="h-8 w-2/3 rounded" />
        <div className="mt-2 h-px w-full bg-gray" />

        <div className="flex flex-row items-center gap-[1vw] py-[1vw]">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-6 w-18 rounded-lg" />
        </div>

        <div className="py-[2vw]">
          <Skeleton className="h-4 w-10 rounded" />
          <div className="flex flex-row flex-wrap gap-[0.8vw] p-[1vw]">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-[1.5vw] pr-[3vw]">
        <Skeleton className="h-4 w-12 rounded" />
        <div className="flex flex-row flex-wrap gap-[0.8vw] p-[1vw]">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-14 rounded-sm" />
          ))}
        </div>
      </div>

      <div className="w-full pt-[2.5vw] pr-[3vw]">
        <Skeleton className="h-4 w-16 rounded" />
        <div className="grid w-full grid-cols-4 gap-[0.4vw] p-[1vw]">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-15 w-20 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PrimaryCardSkeleton() {
  return (
    <div className="m-[3vw] h-auto w-full rounded-sm bg-accent p-11">
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-5 w-32 rounded" />
      </div>
      <div className="mt-2 h-px w-full bg-gray" />

      <div className="flex flex-row items-center gap-2 py-[2vw]">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-48 rounded" />
      </div>
      <div className="h-px w-full bg-gray" />

      <div className="flex flex-col gap-4 pt-[2vw]">
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
      <div className="my-6 h-px w-full bg-gray" />

      <div className="flex justify-end pb-[2vw]">
        <Skeleton className="h-7 w-28 rounded" />
      </div>

      <Skeleton className="h-[3vw] w-full rounded-sm" />
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
      <Skeleton className="h-4 w-20 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-3/4 rounded" />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col overflow-x-clip">
      {/* بخش بالایی: تصاویر / اطلاعات / کارت قیمت */}
      <div className="flex flex-row pl-[6vw]">
        <div className="flex w-full flex-2 flex-col gap-[4vw]">
          <div className="flex w-full flex-row">
            <div className="flex-1">
              <ProductImagesSkeleton />
            </div>
            <div className="flex-1">
              <ProductInfoSkeleton />
            </div>
          </div>
        </div>
        <div className="flex-1 pt-[3vw]">
          <div className="sticky top-36">
            <PrimaryCardSkeleton />
          </div>
        </div>
      </div>

      {/* توضیحات محصول */}
      <div className="flex flex-col gap-4 px-[3vw] py-[1vw]">
        <Skeleton className="h-7 w-32 rounded" />
        <div className="flex flex-col gap-2 pt-[1vw]">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      </div>

      {/* نظرات و محصولات مشابه */}
      <div className="flex min-w-0 flex-col gap-[3vw] px-[3vw] py-[2vw] lg:flex-row">
        <div className="w-full min-w-0 lg:w-3/4">
          <div className="flex flex-row rounded-sm border border-gray">
            <div className="flex flex-2 flex-col items-center justify-center gap-3 p-[2vw]">
              <Skeleton className="h-10 w-16 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-9 w-32 rounded-sm" />
            </div>
            <div className="flex-5 flex-col gap-6 p-[2vw]">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="pb-6">
                  <CommentSkeleton />
                </div>
              ))}
            </div>
          </div>

          {/* محصولات مشابه */}
          <section className="mt-8 mb-8 w-full">
            <Skeleton className="h-7 w-36 rounded" />
            <div className="mt-[2vw] flex w-full gap-4 rounded-sm border border-gray p-[2vw]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-1 flex-col gap-2">
                  <Skeleton className="aspect-square w-full rounded-md" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                  <Skeleton className="h-4 w-1/3 rounded" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="w-full min-w-0 lg:w-1/4">
          <div className="self-start pb-8 lg:sticky lg:top-36">
            <div className="flex h-auto w-full flex-col rounded-sm bg-accent">
              <div className="flex w-full flex-row gap-4 pl-[1vw]">
                <Skeleton className="aspect-square flex-1 rounded-[0_10_0_90px]" />
                <div className="flex w-full flex-1 flex-col gap-3 pt-[3vw] pb-[2vw]">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-3 w-2/3 rounded" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                </div>
              </div>
              <div className="flex flex-col gap-3 p-[1.5vw]">
                <div className="flex justify-end">
                  <Skeleton className="h-6 w-24 rounded" />
                </div>
                <Skeleton className="h-12 w-full rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
