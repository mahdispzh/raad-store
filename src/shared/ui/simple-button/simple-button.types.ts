import type { ReactNode } from "react";

export type IconPosition = "left" | "right";
export type ButtonVariant = "primary" | "secondary" | "success" | "danger";

export interface SimpleButtonProps {
  label: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  variant?: ButtonVariant;
  disabled?: boolean;
  action: () => void;
}