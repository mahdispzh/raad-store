"use client";

import React from "react";
import { getBorderStyles, getTextStyles } from "./otp-input.constants";
import { OtpInputProps } from "./otp-input.types";
import { useOtpInput } from "./useOtpInput";

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  value,
  onChange,
  status = "default",
  disabled = false,
  onEnter,
}) => {
  const { otpArray, handleChange, handleKeyDown, handlePaste, setRef } =
    useOtpInput(length, value, onChange, disabled);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3" dir="ltr">
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            className={`relative flex h-14 w-14 items-center justify-center border-b-2 font-medium text-3xl transition-all duration-200 ${getBorderStyles(status)} ${
              !disabled && status === "default" ? "hover:border-secondary" : ""
            } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-text"}`}
          >
            {/* شبه‌عنصر برای سایه پایین */}
            {(status === "error" || status === "success") && (
              <div
                className={`absolute bottom-0 left-0 h-[2px] w-full transition-all duration-200 ${
                  status === "error"
                    ? "shadow-[0_4px_6px_rgba(255,0,0,0.3)]"
                    : "shadow-[0_4px_6px_rgba(0,255,0,0.25)]"
                }`}
              />
            )}
            <input
              ref={(el) => setRef(el, index)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otpArray[index] ?? ""}
              placeholder=""
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onEnter?.();
                  return;
                }

                handleKeyDown(index, e);
              }}
              onPaste={handlePaste}
              disabled={disabled}
              className={`h-full w-full bg-transparent text-center font-medium text-2xl outline-none ${getTextStyles(status)} placeholder:text-gray-400`}
            />
          </div>
        ))}
      </div>

      {/* ANIMATION STYLE */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(2px);
          }
        }

        .animate-shake {
          animation: shake 0.45s ease-in-out;
        }
      `}</style>
    </div>
  );
};
