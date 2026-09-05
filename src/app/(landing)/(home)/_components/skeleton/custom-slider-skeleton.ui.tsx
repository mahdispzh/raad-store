"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CustomSliderSkeleton() {
  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[35vw] w-full overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 py-2 sm:py-3 md:py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-2 w-2 rounded-full" />
        ))}
      </div>
    </div>
  );
}
