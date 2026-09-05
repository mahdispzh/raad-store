"use client";

import { useState } from "react";
import { z } from "zod";

export function useValidation<T>(schema: z.ZodSchema<T>) {
  const [value, setValue] = useState<T>("" as T);
  const [error, setError] = useState("");

  const validate = (val: T) => {
    const result = schema.safeParse(val);

    if (result.success) {
      setError("");
      return true;
    }

    setError(result.error.issues?.[0]?.message || "مقدار نامعتبر است");
    return false;
  };

  const onChange = (newValue: T) => {
    setValue(newValue);
    setError("");
  };

  const reset = () => {
    setValue("" as T);
    setError("");
  };

  return {
    value,
    error,
    onChange,
    reset,
    validate: () => validate(value as T),
    isValid: !error && value !== undefined,
  };
}
