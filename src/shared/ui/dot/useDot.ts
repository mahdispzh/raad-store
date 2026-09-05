import { colorClasses, sizeClasses } from "./dot.constants";

import type { DotProps } from "./dot.types";

export function useDot({
  size = "sm",
  color = "gray",
}: Pick<DotProps, "size" | "color">) {
  const sizeClass = sizeClasses[size];

  const colorClass = colorClasses[color];

  return {
    sizeClass,
    colorClass,
  };
}
