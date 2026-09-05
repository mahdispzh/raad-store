import { sizeClasses } from "./badge-number.constants";

import type { BadgeNumberProps } from "./badge-number.types";

export function useBadgeNumber({
  size = "sm",
  variant = "circle",
}: Pick<BadgeNumberProps, "size" | "variant">) {
  const sizeClass = sizeClasses[size];

  const radiusClass = variant === "circle" ? "rounded-full" : "rounded-xs";

  return {
    sizeClass,
    radiusClass,
  };
}
