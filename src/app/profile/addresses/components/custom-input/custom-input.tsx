"use client";

import { forwardRef, useState } from "react";
import { SIZE_CLASSES } from "./custom-input.constants";
import { onlyDigits } from "./custom-input.utils";
import type { CustomInputProps } from "./custom-input.types";

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onChange, label, placeholder, type = "text", size = "md", disabled = false, required = false, icon: Icon, iconPosition = "left", error, name, ...rest }, ref) => {
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
          <label className={`font-medium text-sm ${error ? "text-red-500" : "text-primary"}`}>
            {label} {required && <span className="mr-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && iconPosition === "left" && (
            <div className="absolute top-1/2 left-3 -translate-y-1/2"><Icon size={"md"}/></div>
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
            className={`w-full rounded-sm border hover:border-primary/50 bg-white outline-none transition-all ${SIZE_CLASSES[size]} ${error ? "border-red-500" : "border-gray"} ${Icon && iconPosition === "left" ? "pl-10" : ""} ${Icon && iconPosition === "right" ? "pr-10" : ""} disabled:cursor-not-allowed disabled:opacity-50`}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute top-1/2 left-3 -translate-y-1/2"
            >
              👁
            </button>
          )}

          {Icon && iconPosition === "right" && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2" ><Icon /></div>
          )}
        </div>

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
