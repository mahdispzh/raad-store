"use client";

import { forwardRef, useState } from "react";
import { Caption } from "../../../caption/caption.ui";
import { Text } from "../../../text/text.ui";
import { SIZE_CLASSES } from "./custom-input.constants";
import type { CustomInputProps } from "./custom-input.types";
import { onlyDigits } from "./custom-input.utils";

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      type = "text",
      size = "md",
      disabled = false,
      required = false,
      icon: Icon,
      iconPosition = "left",
      error,
      name,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type === "phone"
          ? "tel"
          : type === "number"
            ? "text"
            : type;

    const handleChange = (value: string) => {
      if (type === "number" || type === "phone") {
        onChange?.(onlyDigits(value));
        return;
      }
      onChange?.(value);
    };

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <div className="flex flex-row">
            <Text text={label} size="md" weight="medium" color="primary" />
            {required && <span className="mr-1 text-danger">*</span>}
          </div>
        )}

        <div className="relative">
          {Icon && iconPosition === "left" && (
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <Icon size={"md"} />
            </div>
          )}

          <input
            ref={ref}
            value={value ?? ""}
            name={name}
            disabled={disabled}
            type={inputType}
            placeholder={placeholder}
            autoComplete="off"
            onChange={(e) => handleChange(e.target.value)}
            {...rest}
            className={`text-regular w-full rounded-sm border text-sm transition-all outline-none hover:border-primary/50 ${SIZE_CLASSES[size]} ${error ? "border-danger" : "border-gray"} ${Icon && iconPosition === "left" ? "pl-10" : ""} ${Icon && iconPosition === "right" ? "pr-10" : ""} disabled:cursor-not-allowed disabled:opacity-50`}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 left-3 -translate-y-1/2"
            >
              👁
            </button>
          )}

          {Icon && iconPosition === "right" && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <Icon />
            </div>
          )}
        </div>

        {error && <Caption text={error} size="xs" color="danger" />}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";
