import type { ElementType } from "react";

export type CustomInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "phone";

export type CustomInputSize = "sm" | "md" | "lg";

export interface CustomInputProps {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: CustomInputType;
  size?: CustomInputSize;
  disabled?: boolean;
  required?: boolean;
  icon?: ElementType;
  iconPosition?: "left" | "right";
  error?: string | undefined; // اضافه کردن | undefined
  name: string;
}
