import { SelectProps } from "@/src/app/dashboard/products/_components/custom-select";
import { CustomInputProps } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { Control, Path } from "react-hook-form";

export type Mode = "single" | "pair" | "select-input";

export interface BaseField {
  name: string;
  label: string;
  placeholder?: string;
}

export interface SingleProps<T> {
  control: Control<T>;
  name: Path<T>;
  mode: "single";
  firstField: BaseField & {
    type?: CustomInputProps["type"];
  };
}

export interface PairProps<T> {
  control: Control<T>;
  name: Path<T>;
  mode: "pair";
  firstField: BaseField;
  secondField: BaseField;
}

export interface SelectInputProps<T> {
  control: Control<T>;
  name: Path<T>;
  mode: "select-select";
  firstField: BaseField;
  secondField: BaseField;
  selectField: Omit<SelectProps, "value" | "onChange">;
}

export type Props<T> = SingleProps<T> | PairProps<T> | SelectInputProps<T>;
