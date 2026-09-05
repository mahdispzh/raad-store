"use client";

import { Skeleton } from "@/components/ui/skeleton";


export function AboutUsSkeleton() {
  return (
    <div className="flex flex-col">
      {/* بخش اول - درباره ما */}
      <div className="order-1 h-auto w-full bg-white py-6 lg:order-2 lg:h-[18vw] lg:py-2">
        <div className="px-4 md:px-6 lg:px-12">
          <div className="flex flex-col py-2">
            <Skeleton className="h-7 w-32 rounded" />

            <div className="py-3">
              <div className="flex flex-col items-center gap-3 py-3">
                <div className="flex w-full flex-col gap-2 pb-3 md:pb-5">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش دوم - اطلاعات تماس و لوگو */}
      <div className="order-2 h-auto w-full bg-accent pt-4 lg:order-1 lg:h-[14vw]">
        <div className="flex flex-col px-4 md:flex-row md:justify-between md:px-6 lg:px-12">
          {/* اطلاعات تماس */}
          <div className="flex w-full flex-col py-2 lg:w-auto">
            <Skeleton className="h-7 w-28 rounded" />

            <div className="py-3">
              {/* آدرس */}
              <div className="flex flex-row items-center gap-3 py-2 md:py-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>

              {/* تلفن */}
              <div className="flex flex-row items-center gap-3 py-2 md:py-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>

              {/* ایمیل */}
              <div className="flex flex-row items-center gap-3 py-2 md:py-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-56 rounded" />
              </div>
            </div>

            {/* شبکه‌های اجتماعی - موبایل و تبلت */}
            <div className="item mt-4 flex flex-row gap-4 md:mt-8 lg:hidden">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
            </div>
          </div>

          {/* لوگو و شبکه‌های اجتماعی - دسکتاپ */}
          <div className="hidden flex-col items-center py-4 lg:flex lg:py-2">
            <div className="flex justify-center lg:justify-end">
              <Skeleton className="h-auto w-40 md:w-60 lg:h-[106px] lg:w-[307px]" />
            </div>
            <div className="item mt-4 flex flex-row gap-4 md:mt-8 md:gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
