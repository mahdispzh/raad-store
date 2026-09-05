// icon-label-button._types.ts

import { FilterHamburgerIcon } from "@/src/shared/constants/icons/filter-hamburger-icon";
import React from "react";

/**
 * نوع آیکون‌های قابل استفاده در دکمه
 */
export type IconType = "filter" | "dropdown" | "dropleft" | "none";

/**
 * سایز متن داخل دکمه
 */
export type TextSize = "sm" | "md" | "lg";

/**
 * وزن متن
 */
export type TextWeight = "light" | "regular" | "medium" | "bold";

/**
 * رنگ متن
 */
export type TextColor =
  | "primary"
  | "secondary"
  | "white"
  | "danger"
  | "success";

/**
 * تایپ کامپوننت آیکون‌ها
 */
export type IconComponentType = typeof FilterHamburgerIcon;

/**
 * سایز قابل قبول آیکون (از خود آیکون گرفته شده)
 */
export type IconProps = React.ComponentProps<IconComponentType>;

export type IconSize = IconProps["size"];

/**
 * Props اصلی کامپوننت
 */
export interface IconLabelButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;

  iconType?: IconType;
  iconPosition?: "left" | "right";

  showBorder?: boolean;
  borderColor?: string;

  textSize?: TextSize;
  textWeight?: TextWeight;
  textColor?: TextColor;

  iconSize?: IconSize;
}
