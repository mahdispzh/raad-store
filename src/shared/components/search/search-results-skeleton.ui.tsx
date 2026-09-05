"use client";

import { Skeleton } from "@/components/ui/skeleton";


export function SearchResultsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex w-full items-center gap-3 p-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>
      ))}
    </div>
  );
}