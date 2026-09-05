"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { CustomInput } from "./custom-input";
import type { CustomInputProps } from "./custom-input.types";

interface CustomInputRHFProps<T extends FieldValues> extends Omit<CustomInputProps, "value" | "onChange" | "error"> {
  control: Control<T>;
  name: Path<T>;
}

export function CustomInputRHF<T extends FieldValues>({ control, name, ...props }: CustomInputRHFProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        let value = field.value ?? "";

        // اگر فیلد Number هست، مقدار رو همیشه به string تبدیل کن تا select درست کار کنه
        if (props.type === "number" && typeof field.value === "number") {
          value = String(field.value);
        }

        return (
          <CustomInput
            {...props}
            value={value}
            onChange={(val: string) => {
              if (props.type === "number") {
                const num = val === "" ? "" : Number(val);
                field.onChange(num);
              } else if (props.type === "phone") {
                field.onChange(val);
              } else {
                field.onChange(val);
              }
            }}
            error={fieldState.error?.message}
          />
        );
      }}
    />
  );
}
