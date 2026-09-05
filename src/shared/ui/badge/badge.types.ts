// _types/badge._types.ts
import { IconSize } from "@/src/shared/types/IconTypes";

type BadgeType =
  | "new"
  | "discount"
  | "number"
  | "counter"
  | "messages"
  | "rating";

export interface BadgeProps {
  type: BadgeType;
  label?: string;
  number?: number;
  rating?: number | string;
  iconSize?: IconSize;
  iconColor?: string;
}
