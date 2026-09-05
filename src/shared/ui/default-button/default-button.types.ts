// _types/default-button.types.ts

import type { ReactNode } from "react";

export type ButtonType = "primary" | "secondary";
export type ButtonStyle = "outline" | "fill";
export type IconPosition = "left" | "right";

export interface DefaultButtonProps {
  type?: ButtonType;
  style?: ButtonStyle;
  label: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  action: () => void;
  htmlType?: "button" | "submit" | "reset";
}
