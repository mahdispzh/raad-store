"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardContainer } from "@/src/shared/components/dashboard-container";

export function BlogDetailSkeleton() {
  return (
    <DashboardContainer>
      <div className="flex w-full flex-col gap-12 pb-6">
        {/* breadcrumb */}
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-4 w-16 rounded" />
          <span className="text-gray">/</span>
          <Skeleton className="h-4 w-20 rounded" />
        </div>

        {/* header: عنوان + دکمه‌های اشتراک/ذخیره */}
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-7 w-2/3 rounded" />
          <div className="flex items-center justify-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>

        {/* meta + details (تصویر و اطلاعات) */}
        <div className="relative flex w-full items-center justify-center">
          <div className="absolute top-0 right-0 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </div>

          <div className="gap-layout flex w-[539px] flex-col">
            <Skeleton className="h-[523px] w-[539px] rounded-lg" />

            <div className="flex justify-between px-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>

        {/* like button */}
        <div className="flex justify-end">
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </DashboardContainer>
  );
}
