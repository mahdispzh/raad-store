// src/shared/ui/styled-button/useStyledButton.ts

import { useEffect, useState } from "react";
import type { StyledButtonProps } from "./styled-button.types";

export function useStyledButton({
  variant,
  select = false,
  action,
  ratingAction,
  type = "primary",
  size = "md",
  style = "outline",
}: Pick<
  StyledButtonProps,
  "variant" | "select" | "action" | "ratingAction" | "type" | "size" | "style"
>) {
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [isActive, setIsActive] = useState(select);

  useEffect(() => {
    setIsActive(select);
  }, [select]);

  const getButtonClasses = () => {
    let buttonClasses = "";

    if (variant === "size") {
      buttonClasses = `
        flex items-center justify-center
        w-[clamp(30px,2.14vw,42px)] h-[clamp(22px,1.61vw,32px)]
        rounded-xs
        transition-all
        font-shafarik
        text-[clamp(0.75rem,0.86vw,1rem)]
        bg-accent
        text-black
        cursor-pointer
        ${select ? "ring-1 ring-primary ring-offset-2" : ""}
      `;
    }
    if (variant === "color") {
      buttonClasses = `
        flex items-center justify-center
        w-[clamp(14px,0.99vw,20px)] h-[clamp(14px,0.99vw,20px)]
        rounded-full
        transition-all
        cursor-pointer
        ${select ? "ring-1 ring-secondary ring-offset-2" : ""}
      `;
    }

    if (variant === "icon") {
      buttonClasses =
        type === "primary"
          ? `
          flex items-center justify-center
          w-[clamp(2.2rem,3vw,3rem)] h-[clamp(2.2rem,3vw,3rem)]
          rounded-full
          transition-all
          cursor-pointer
          hover:active:scale-[0.97]
        `
          : `
          flex items-center justify-center
          w-[clamp(20px,1.25vw,32px)] h-[clamp(20px,1.25vw,32px)]
          rounded-full
          transition-all
          cursor-pointer
        `;
    }

    if (variant === "toggleIcon") {
      if (type === "quaternary") {
        buttonClasses = `
          flex items-center justify-center
            aspect-[1.1] h-[2.5vw] max-h-[45px] min-h-[40px] w-full

          text-sm
          font-primary
          border-2
          rounded-[clamp(6px,0.42vw,8px)] 
          transition-all
          cursor-pointer
          ${
            isActive
              ? `
                bg-primary
                text-white
                border-primary
                hover:bg-primary/90
              `
              : `
                bg-transparent
                text-primary
                border-primary
                hover:bg-primary/10
                hover:text-primary
                hover:border-primary
              `
          }
        `;
      } else {
        buttonClasses = `
          flex items-center justify-center
            aspect-[1.1] h-[2vw] max-h-[45px] min-h-[40px] w-full"
          rounded-[clamp(8px,0.66vw,10px)]
          border-2
          transition-all
          cursor-pointer
          active:scale-[0.95]
          ${
            isActive
              ? `
                bg-primary
                text-white
                border-primary
                hover:bg-primary/90
              `
              : `
                bg-transparent
                border-primary
                text-primary
                hover:bg-primary/10
                hover:text-primary
                hover:border-primary
              `
          }
        `;
      }
    }

    return buttonClasses;
  };

  const handleToggle = () => {
    setIsActive(!isActive);
    if (action) action();
  };

  const handleRating = (starValue: number) => {
    setRating(starValue);
    if (ratingAction) ratingAction(starValue);
  };

  return {
    rating,
    hoverValue,
    isActive,
    setHoverValue,
    handleToggle,
    handleRating,
    getButtonClasses,
  };
}
