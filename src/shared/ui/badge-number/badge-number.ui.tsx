"use client";

import { useBadgeNumber } from "./use-badge-number";

import type { BadgeNumberProps } from "./badge-number.types";

export function BadgeNumber({
  value,
  size = "sm",
  variant = "circle",
  className = "",
}: BadgeNumberProps) {
  const { sizeClass, radiusClass } = useBadgeNumber({
    size,
    variant,
  });

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center bg-danger font-medium leading-none text-white ${sizeClass} ${radiusClass} ${className} `}
    >
      {value}
    </div>
  );
}
