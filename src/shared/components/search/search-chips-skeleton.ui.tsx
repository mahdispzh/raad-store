"use client";

import { Skeleton } from "@/components/ui/skeleton";


interface ChipSkeletonProps {
  variant?: "recent" | "popular";
  width?: string;
}

function ChipSkeleton({ variant = "popular", width = "6vw" }: ChipSkeletonProps) {
  if (variant === "recent") {
    return (
      <Skeleton
        className="h-[1.7vw] rounded-full"
        style={{ width: `calc(${width} + 1.5vw)` }}
      />
    );
  }

  return <Skeleton className="h-[1.7vw] rounded-full" style={{ width }} />;
}

export function SearchChipsSkeleton({
  variant = "popular",
  count = 5,
}: {
  variant?: "recent" | "popular";
  count?: number;
}) {
  const widths = ["5vw", "7vw", "4.5vw", "6vw", "5.5vw", "8vw"];

  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ChipSkeleton
          key={i}
          variant={variant}
          width={widths[i % widths.length] ?? "6vw"}
        />
      ))}
    </div>
  );
}
