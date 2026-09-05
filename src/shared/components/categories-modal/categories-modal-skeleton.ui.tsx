// components/CategoryModal/categories-modal-skeleton.ui.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";


function MainCategoryRowSkeleton() {
  return (
    <div className="flex items-start gap-3 px-3 py-2">
      <Skeleton className="h-14 w-14 flex-shrink-0 rounded-xs" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-3 w-32 rounded" />
      </div>
    </div>
  );
}

function SubCategoryRowSkeleton() {
  return (
    <div className="flex items-center justify-between px-3 py-3">
      <Skeleton className="h-4 w-28 rounded" />
    </div>
  );
}

export function CategoriesModalSkeleton() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-2">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Main Categories */}
        <div className="flex w-2/5 flex-col gap-1 border-l border-gray-200 bg-gray-50 pt-6 pr-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <MainCategoryRowSkeleton key={i} />
          ))}
        </div>

        {/* Right Panel - Sub Categories */}
        <div className="flex w-3/5 flex-col gap-1 p-5">
          <Skeleton className="mb-4 h-5 w-40 rounded" />
          {Array.from({ length: 5 }).map((_, i) => (
            <SubCategoryRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
