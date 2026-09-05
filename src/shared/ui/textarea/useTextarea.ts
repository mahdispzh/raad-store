// _hooks/use-textarea.ts
import { useEffect, useState } from "react";

export function useTextarea(
  value: string = "",
  onChange?: (value: string) => void,
) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange?.(newValue);
  };

  return { text, handleChange };
}
