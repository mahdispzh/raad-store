"use client";

import { useMemo } from "react";
import { Caption } from "../../../caption/caption.ui";
import type { TextareaProps } from "./textarea.types";

export function Textarea({
  label,
  value = "",
  onChange,
  placeholder = "متن خود را وارد کنید...",
  disabled = false,
  rows = 4,
  error,
}: TextareaProps) {
  const hasError = !!error;

  const heightStyle = useMemo(() => {
    // هر row تقریبا 24px + padding
    return rows * 24 + 24;
  }, [rows]);

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <p
          className={`text-medium text-md ${
            hasError ? "text-danger" : "text-primary"
          }`}
        >
          {label}
        </p>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{ height: heightStyle }}
        className={`w-full resize-none rounded-sm border px-3 py-2 text-sm transition-all outline-none ${
          hasError ? "border-danger" : "border-gray"
        } ${
          disabled ? "cursor-not-allowed opacity-60" : "hover:border-primary/50"
        } `}
      />

      {hasError && <Caption text={error} size="xs" color="danger" />}
    </div>
  );
}
