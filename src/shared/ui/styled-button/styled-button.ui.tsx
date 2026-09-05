// src/shared/ui/styled-button/styled-button.ui.tsx

"use client";

import { OutlineStarIcon } from "@/src/shared/constants/icons/outline-star-icon";
import { SolidStarIcon } from "@/src/shared/constants/icons/solid-star-icon";
import React from "react";
import { StyledButtonProps } from "./styled-button.types";
import { useStyledButton } from "./useStyledButton";

export function StyledButton({
  variant,
  label,
  select = false,
  action = () => {},
  ratingAction = () => {},
  type = "primary",
  icon,
  size = "md",
  color,
  style = "outline",
}: StyledButtonProps) {
  const {
    rating,
    hoverValue,
    setHoverValue,
    handleToggle,
    handleRating,
    getButtonClasses,
  } = useStyledButton({
    variant,
    select,
    action,
    ratingAction,
    type,
    size,
    style,
  });

  let buttonClasses = "";
  let content: React.ReactNode = null;
  let buttonAction = action;

  if (variant === "size") {
    buttonClasses = getButtonClasses();
    content = label;
  }

  if (variant === "color") {
    buttonClasses = getButtonClasses();
  }

  if (variant === "icon") {
    buttonClasses = getButtonClasses();
    content = icon;
  }

  if (variant === "rating") {
    content = (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          const isFilled =
            hoverValue > 0 ? starValue <= hoverValue : starValue <= rating;

          return (
            <div
              key={i}
              className="relative cursor-pointer transition-transform hover:scale-110 active:scale-95"
              onClick={() => handleRating(starValue)}
              onMouseEnter={() => setHoverValue(starValue)}
              onMouseLeave={() => setHoverValue(0)}
            >
              <OutlineStarIcon size={size} color="text-danger" />
              {isFilled && (
                <div className="absolute top-0 left-0">
                  <SolidStarIcon size={size} color="text-danger" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "toggleIcon") {
    buttonAction = action;
    buttonClasses = getButtonClasses();
    content =
      icon && React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
            color: "text-current",
          })
        : icon;
  }

  return (
    <button
      onClick={buttonAction}
      className={buttonClasses}
      style={
        variant === "color" && color ? { backgroundColor: color } : undefined
      }
    >
      {content}
    </button>
  );
}
