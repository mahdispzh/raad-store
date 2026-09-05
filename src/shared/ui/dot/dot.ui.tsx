"use client";

import { useDot } from "./useDot";

import type { DotProps } from "./dot.types";

export function Dot({ size = "sm", color = "gray", className = "" }: DotProps) {
  const { sizeClass, colorClass } = useDot({
    size,
    color,
  });

  return (
    <div
      className={`shrink-0 rounded-full ${sizeClass} ${colorClass} ${className}`}
    />
  );
}
