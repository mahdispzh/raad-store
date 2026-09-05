"use client";

import { SpinnerIcon } from "@/src/shared/constants/icons/spinner-icon";
import React from "react";
import { DefaultButtonProps } from "./default-button.types";
import { useDefaultButton } from "./useDefaultButton";

export function DefaultButton({
  type = "primary",
  style = "fill",
  label = "متن",
  icon,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  rounded = false,
  action,
  htmlType = "button",
}: DefaultButtonProps) {
  const { buttonClassName, showLoader, getLoaderColor } = useDefaultButton(
    type,
    style,
    isLoading,
    disabled,
    rounded,
  );

  const coloredIcon =
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
          color: "text-current",
        })
      : icon;

  return (
    <button
      type={htmlType}
      onClick={action}
      disabled={disabled || isLoading}
      className={buttonClassName}
    >
      {showLoader ? (
        <div className="flex items-center justify-center gap-2">
          <SpinnerIcon size="md" color={getLoaderColor()} />
        </div>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="inline-flex shrink-0">{coloredIcon}</span>
          )}
          <span>{label}</span>
          {icon && iconPosition === "right" && (
            <span className="inline-flex shrink-0">{coloredIcon}</span>
          )}
        </>
      )}
    </button>
  );
}
