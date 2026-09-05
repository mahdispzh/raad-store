"use client";

import { CheckIcon } from "@/src/shared/constants/icons";

type CustomCheckboxProps = {
  checked: boolean;
  onChange: () => void;
  ariaLabel?: string;
  className?: string;
};

export function CustomCheckbox({
  checked,
  onChange,
  ariaLabel,
  className = "",
}: CustomCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`flex h-5 w-5 cursor-pointer shrink-0 items-center justify-center rounded-xs border transition-colors ${className} ${
        checked ? "border-secondary bg-secondary" : "border-secondary bg-transparent"
      }`}
    >
      {checked ? <CheckIcon size="xs" color="text-accent" /> : null}
    </button>
  );
}