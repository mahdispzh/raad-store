// select.types.ts
import type { CustomInputSize } from "../custom-input/custom-input.types";
import type { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export type SelectValue = string | number;

export interface SelectOption {
  value: SelectValue;
  label: string;
}

export type SelectSize = CustomInputSize;

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: SelectValue;
  onChange?: (value: SelectValue) => void;
  searchable?: boolean;
  required?: boolean;
  size?: SelectSize;
  triggerHeight?: string;
  itemSize?: SelectSize;
  error?: string;
  icon?: React.ElementType;
  disabled?: boolean;
  className?: string;
}

export interface SelectRHFProps<T extends FieldValues> 
  extends Omit<SelectProps, "value" | "onChange" | "error"> {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  rules?: Omit<RegisterOptions<T, Path<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
}