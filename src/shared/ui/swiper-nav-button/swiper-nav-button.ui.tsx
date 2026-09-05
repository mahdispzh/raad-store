// ui/swiper-nav-button.ui.tsx
"use client";

import type { SwiperNavButtonProps } from "./swiper-nav-button.types";
import { useSwiperNavButton } from "./useSwiperNavButton";

export function SwiperNavButton({
  direction,
  onClick,
  icon,
  className = "",
  disabled = false,
}: SwiperNavButtonProps) {
  const { finalClassName, handleClick } = useSwiperNavButton(
    direction,
    disabled,
    className,
  );

  return (
    <button
      onClick={() => handleClick(onClick)}
      disabled={disabled}
      className={finalClassName}
    >
      {icon}
    </button>
  );
}
