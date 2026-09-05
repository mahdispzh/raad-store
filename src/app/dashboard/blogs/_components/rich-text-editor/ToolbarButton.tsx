"use client";

import { ReactNode } from "react";

interface ToolbarButtonProps {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}

export function ToolbarButton({
  children,
  onClick,
  active = false,
  disabled = false,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-9 min-w-9 items-center justify-center rounded-md border font-medium text-sm transition-all duration-150 ${
        active
          ? "border-primary bg-primary text-white"
          : "border-transparent text-primary hover:bg-gray-100"
      } ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"} `}
    >
      {children}
    </button>
  );
}
