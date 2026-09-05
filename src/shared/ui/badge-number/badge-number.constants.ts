import type { BadgeNumberSize } from "./badge-number.types";

export const sizeClasses: Record<BadgeNumberSize, string> = {
  xs: `
    min-w-3 h-3
    px-[2px]
    text-[8px]
  `,

  sm: `
    min-w-[15px] h-[15px]
    px-1
    text-[10px]
  `,

  md: `
    min-w-5 h-5
    px-1.5
    text-xs
  `,

  lg: `
    min-w-[26px] h-[26px]
    px-2
    text-sm
  `,
};
