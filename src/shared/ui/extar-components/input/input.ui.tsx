"use client";

import type { InputProps } from "./input.types";

import {
  HELPER_CLASSES,
  LABEL_CLASSES,
  SIZE_CLASSES,
  STATUS_CLASSES,
} from "./input.constants";

import { useInputStatus } from "./useInput";

export function Input({
  value,
  onChange,
  type,
  label,
  placeholder,
  helperText,

  disabled = false,
  required = false,

  status = "default",
  size = "md",

  maxLength,

  error,
}: InputProps) {
  const currentStatus = useInputStatus(status, !!error);

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          className={`font-medium text-sm ${LABEL_CLASSES[currentStatus]}`}
        >
          {label}
          {required && <span className="mr-1 text-danger">*</span>}
        </label>
      )}

      <input
        value={value === undefined ? "" : value}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => {
          const val = e.target.value;

          if (type === "number") {
            onChange(val === "" ? "" : Number(val));
            return;
          }

          onChange(val);
        }}
        className={`w-full rounded-sm border bg-white transition-all duration-200 outline-none ${SIZE_CLASSES[size]} ${STATUS_CLASSES[currentStatus]} disabled:cursor-not-allowed disabled:opacity-50`}
      />

      {(error?.message || helperText) && (
        <span className={`text-xs ${HELPER_CLASSES[currentStatus]}`}>
          {error?.message || helperText}
        </span>
      )}
    </div>
  );
}
