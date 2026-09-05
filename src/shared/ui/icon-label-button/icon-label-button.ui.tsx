"use client";

import { Text } from "../text/text.ui";
import { iconMap } from "./icon-label-button.constants";
import { IconLabelButtonProps } from "./icon-label-button.types";
import { getBorderClass } from "./icon-label-button.utils";

/**
 * دکمه آیکون + لیبل
 */
export function IconLabelButton({
  label = "فیلتر",
  onClick,
  className = "",

  iconType = "filter",
  iconPosition = "left",

  showBorder = true,
  borderColor = "border-accent",

  textSize = "md",
  textWeight = "bold",
  textColor = "primary",

  iconSize = "xs",
}: IconLabelButtonProps) {
  const borderClass = getBorderClass(showBorder, borderColor);

  const IconComponent = iconType !== "none" ? iconMap[iconType] : null;

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-2 rounded-sm px-4 py-2 transition-all duration-200 hover:opacity-80 active:scale-[0.98] ${borderClass} ${className} `}
    >
      {iconPosition === "left" && IconComponent && (
        <IconComponent size={iconSize} color={"primary"} />
      )}

      {label && (
        <Text
          text={label}
          size={textSize}
          weight={textWeight}
          color={textColor}
        />
      )}

      {iconPosition === "right" && IconComponent && (
        <IconComponent size={iconSize} />
      )}
    </button>
  );
}
