"use client";

import React from "react";
import { SimpleButtonProps } from "./simple-button.types";
import { getSizeClasses, getStateStyles, getVariantClasses } from "./simple-buttons.constants";

export function SimpleButton({
  label,
  icon,
  iconPosition = "left",
  variant = "primary",
  disabled = false,
  action,
}: SimpleButtonProps) {
  const buttonClassName = [
    getVariantClasses(variant, disabled),
    getSizeClasses(),
    getStateStyles(disabled),
  ]
    .filter(Boolean)
    .join(" ");

  // استخراج کلاس رنگ از buttonClassName
  const colorClass = buttonClassName.match(/text-\S+/)?.[0] || "";

  return (
    <button onClick={action} disabled={disabled} className={buttonClassName}>
      {icon && iconPosition === "left" && (
        <span className={`inline-flex shrink-0 ${colorClass}`}>{icon}</span>
      )}
      <span>{label}</span>
      {icon && iconPosition === "right" && (
        <span className={`inline-flex shrink-0 ${colorClass}`}>{icon}</span>
      )}
    </button>
  );
}