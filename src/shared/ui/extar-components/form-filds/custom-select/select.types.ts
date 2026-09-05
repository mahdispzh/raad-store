import {CustomInputSize} from "../custom-input";

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

  value?: SelectValue | null;
  onChange?: (value: SelectValue | null) => void;

  searchable?: boolean;
  required?: boolean;

  size?: SelectSize;
  itemSize?: SelectSize;

  triggerHeight?: string;

  error?: string;

  icon?: React.ElementType;

  loading?: boolean;

  clearable?: boolean;

  optionsError?: boolean;
  optionsErrorMessage?: string;
}
