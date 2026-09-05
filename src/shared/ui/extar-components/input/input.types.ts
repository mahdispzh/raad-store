import type { FieldError } from "react-hook-form";

export type InputValue = string | number | "";

export type InputSize = "sm" | "md" | "lg";
export type InputStatus = "default" | "error" | "success";

export type InputType = "text" | "number" | "email";

export type InputProps = {
  value: InputValue;
  onChange: (value: string | number | "") => void;

  label?: string;
  placeholder?: string;
  helperText?: string;

  type?: InputType;

  disabled?: boolean;
  required?: boolean;

  status?: InputStatus;
  size?: InputSize;

  maxLength?: number;

  error?: FieldError;
};
