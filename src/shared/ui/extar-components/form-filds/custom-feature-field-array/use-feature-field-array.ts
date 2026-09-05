// use-feature-field-array.ts

import { useState } from "react";

export function useFeatureFieldArray() {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setFirstValue("");
    setSecondValue("");
    setError(null);
  };

  return {
    firstValue,
    secondValue,
    setFirstValue,
    setSecondValue,

    error,
    setError,

    reset,
  };
}
