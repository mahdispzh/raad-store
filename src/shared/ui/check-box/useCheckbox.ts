// _hooks/use-checkbox.ts
import { useState } from "react";

// هوک مدیریت منطق چکباکس
export function useCheckbox(
  checked?: boolean,
  defaultChecked: boolean = false,
  onChange?: (checked: boolean) => void,
) {
  const [internal, setInternal] = useState(defaultChecked);

  const isControlled = typeof checked === "boolean";
  const value = isControlled ? checked : internal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;

    if (!isControlled) {
      setInternal(newValue);
    }

    onChange?.(newValue);
  };

  return {
    value,
    handleChange,
  };
}
