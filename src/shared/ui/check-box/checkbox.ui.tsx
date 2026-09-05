"use client";

import { variantStyles } from "./checkbox.constants";
import type { CheckboxProps } from "./checkbox.types";
import { useCheckbox } from "./useCheckbox";

export function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  variant = "primary",
  disabled = false,
}: CheckboxProps) {
  const { value, handleChange } = useCheckbox(
    checked,
    defaultChecked,
    onChange,
  );
  const color = variantStyles[variant];

  return (
    <label
      className={`text-medium flex items-center gap-2 select-none ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={value}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
        />

        <div
          className="flex h-5 w-5 items-center justify-center rounded transition"
          style={{
            border: `2.2px solid ${color}`,
          }}
        >
          {value && (
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none">
              <path
                d="M16 5L8 13L4 9"
                stroke={color}
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      {label && (
        <span className="text-sm text-[var(--color-primary)]">{label}</span>
      )}
    </label>
  );
}
