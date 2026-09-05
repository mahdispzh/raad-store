// _hooks/use-swiper-nav-button.ts

import {
  baseButtonClasses,
  getDirectionClass,
} from "./swiper-nav-button.constants";

// هوک مدیریت منطق دکمه نویگیشن سوایپر
export function useSwiperNavButton(
  direction: "left" | "right",
  disabled: boolean = false,
  className: string = "",
) {
  const directionClass = getDirectionClass(direction);
  const disabledClass = disabled
    ? "opacity-50 hover:scale-100"
    : "hover:scale-110 cursor-pointer";
  const finalClassName =
    `${baseButtonClasses} ${directionClass} ${disabledClass} ${className}`.trim();

  const handleClick = (onClick?: () => void) => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return {
    finalClassName,
    handleClick,
  };
}
