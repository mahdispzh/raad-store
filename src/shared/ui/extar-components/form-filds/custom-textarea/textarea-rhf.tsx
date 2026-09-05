"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Textarea } from "./textarea";
import type { TextareaProps } from "./textarea.types";

interface TextareaRHFProps<T extends FieldValues> extends Omit<
  TextareaProps,
  "value" | "onChange" | "error"
> {
  control: Control<T>;
  name: Path<T>;
}

export function TextareaRHF<T extends FieldValues>({
  control,
  name,
  ...props
}: TextareaRHFProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Textarea
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
