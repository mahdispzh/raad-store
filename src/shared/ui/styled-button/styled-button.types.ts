// src/shared/ui/styled-button/styled-button.types.ts

import { IconSize } from "@/src/shared/types/IconTypes";

export type ButtonVariant = "size" | "color" | "icon" | "rating" | "toggleIcon";

export interface StyledButtonProps {
  variant: ButtonVariant;
  label?: string;
  select?: boolean;
  action?: (() => void) | undefined;
  ratingAction?: ((value: number) => void) | undefined;
  type?: "primary" | "secondary" | "quaternary";
  icon?: React.ReactNode;
  size?: IconSize;
  color?: string;
  style?: "fill" | "outline";
}