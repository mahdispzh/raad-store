import type {
  ElementType,
  InputHTMLAttributes,
} from "react";
export type CustomInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "phone";
export type CustomInputSize =
  | "sm"
  | "md"
  | "lg";
export interface CustomInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "onChange"
  > {
  value?: string | number;
  onChange?: (value: string) => void;
  label?: string;
  type?: CustomInputType;
  size?: CustomInputSize;
  icon?: ElementType;
  iconPosition?: "left" | "right";
  error?: string;
}
