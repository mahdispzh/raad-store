"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Select } from "./select";
import type { SelectProps } from "./select.types";

interface SelectRHFProps<T extends FieldValues> extends Omit<
  SelectProps,
  "value" | "onChange" | "error"
> {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  rules?: any;
}

export function SelectRHF<T extends FieldValues>({
  control,
  name,
  required = false,
  rules = {},
  ...props
}: SelectRHFProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        ...rules,
        ...(required && { required: "انتخاب این فیلد الزامی است" }),
      }}
      render={({ field, fieldState }) => (
        <Select
          {...props}
          value={field.value}
          onChange={(val) => {
            field.onChange(val);
          }}
          // ✅ فقط در صورت وجود error، پراپ error را ارسال کن
          {...(fieldState.error?.message
            ? { error: fieldState.error.message }
            : {})}
          required={required}
        />
      )}
    />
  );
}
