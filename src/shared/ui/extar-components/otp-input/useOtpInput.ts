// _hooks/use-otp-select.ts
import { useEffect, useRef } from "react";

// هوک مدیریت منطق OTP
export function useOtpInput(
  length: number = 4,
  value: string = "",
  onChange?: (value: string) => void,
  disabled: boolean = false,
) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const otpArray = value.slice(0, length).padEnd(length, "").split("");

  const handleChange = (index: number, newValue: string) => {
    if (disabled) return;

    const digit = newValue.slice(-1);
    if (digit !== "" && !/^\d$/.test(digit)) return;

    const newOtp = [...otpArray];

    if (digit === "") {
      newOtp[index] = "";
      onChange?.(newOtp.join(""));
      return;
    }

    newOtp[index] = digit;
    onChange?.(newOtp.join(""));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const currentValue = otpArray[index];

    if (e.key === "Backspace") {
      if (!currentValue && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otpArray];
        newOtp[index - 1] = "";
        onChange?.(newOtp.join(""));
      } else if (currentValue) {
        const newOtp = [...otpArray];
        newOtp[index] = "";
        onChange?.(newOtp.join(""));
      }
    }

    if (e.key === "Delete") {
      const newOtp = [...otpArray];
      newOtp[index] = "";
      onChange?.(newOtp.join(""));
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (pasted) {
      onChange?.(pasted);
      const lastIndex = Math.min(pasted.length, length) - 1;
      if (lastIndex >= 0) {
        inputRefs.current[lastIndex]?.focus();
      }
    }
  };

  const setRef = (el: HTMLInputElement | null, index: number) => {
    if (el) inputRefs.current[index] = el;
  };

  useEffect(() => {
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  return {
    otpArray,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste,
    setRef,
  };
}
