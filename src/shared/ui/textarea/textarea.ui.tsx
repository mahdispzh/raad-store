// ui/textarea.ui.tsx
"use client";

import { useTextarea } from "./useTextarea";

export function Textarea({
  label,
  value = "",
  onChange,
  placeholder = "متن خود را وارد کنید...",
  isError = false,
  errorMessage,
  disabled = false,
  rows = 4,
}: TextareaProps) {
  const { text, handleChange } = useTextarea(value, onChange);

  const hasError = isError || !!errorMessage;
  const borderColorClass = hasError ? "border-danger" : "border-gray";
  const labelColorClass = hasError ? "text-danger" : "text-primary";
  const textColorClass = disabled ? "text-secondary" : "text-primary";

  return (
    <div className={`flex flex-col gap-3 `} dir="rtl">
      {label && (
        <label className={`block font-medium text-xs ${labelColorClass}`}>
          {label}
        </label>
      )}

      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`w-full rounded-sm p-3 text-sm ${textColorClass} border-2 bg-white ${borderColorClass} resize-none placeholder-secondary transition-all focus:ring-2 focus:ring-secondary/20 focus:outline-none ${disabled ? "cursor-not-allowed opacity-60" : "hover:border-secondary"} `}
      />

      {hasError && errorMessage && (
        <p className="font-medium text-xs text-danger">{errorMessage}</p>
      )}
    </div>
  );
}
