// ui/switch.ui.tsx
"use client";

import type { SwitchProps } from "./switch.types";
import { useSwitch } from "./useSwitch";

export function Switch({
  size = "large",
  disabled = false,
  label,
}: SwitchProps) {
  const { checked, toggle, current, getKnobLeft } = useSwitch(size, disabled);

  return (
    <label className="inline-flex items-center gap-3 select-none">
      {/* Switch */}
      <div
        onClick={toggle}
        className={`relative flex items-center rounded-full transition-colors duration-300 ${current.container} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${checked ? "bg-primary" : "bg-gray"} `}
      >
        {/* Knob */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md transition-all duration-300 ${current.knob} `}
          style={{
            left: getKnobLeft(),
          }}
        />
      </div>

      {/* Label */}
      {label && <span className="text-sm text-primary">{label}</span>}
    </label>
  );
}
