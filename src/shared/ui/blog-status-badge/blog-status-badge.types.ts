import type { ComponentType } from "react";
import type { IconProps } from "../../types/IconTypes";

export type BlogStatus = 0 | 1 | 2 | 3;

export type BlogStatusConfig = {
  label: string;
  Icon: ComponentType<IconProps>;
  /** کلاس رنگ متن و آیکون (مثلاً text-warning) */
  textColorClass: string;
  /** کلاس رنگ بوردر بج (مثلاً border-warning) */
  borderColorClass: string;
};

export type BlogStatusBadgeProps = {
  status: BlogStatus;
};
