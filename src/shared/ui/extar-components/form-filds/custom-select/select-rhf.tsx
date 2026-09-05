"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Select } from "./select";
import type { SelectProps } from "./select.types";

export function SelectRHF<T extends FieldValues>({
                                                   control,
                                                   name,
                                                   ...props
                                                 }: {
  control: Control<T>;
  name: Path<T>;
} & Omit<SelectProps, "value" | "onChange" | "error">) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          {...props}
          value={field.value ?? null}   // 🔥 مهم
          onChange={(val) => field.onChange(val ?? null)} // 🔥 مهم
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
