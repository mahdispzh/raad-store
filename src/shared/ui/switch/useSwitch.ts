// _hooks/use-switch.ts
import { useState } from "react";
import { SwitchSize } from "./switch.types";

const sizes = {
  large: {
    container: "w-[44px] h-[24px]",
    knob: "w-[20px] h-[20px]",
    padding: 2,
  },
  small: {
    container: "w-[36px] h-[20px]",
    knob: "w-[16px] h-[16px]",
    padding: 2,
  },
};

export function useSwitch(
  size: SwitchSize = "large",
  disabled: boolean = false,
) {
  const [checked, setChecked] = useState(false);
  const current = sizes[size];

  const toggle = () => {
    if (!disabled) setChecked(!checked);
  };

  const getKnobLeft = () => {
    const knobWidth = Number(current.knob.match(/\d+/)?.[0])!;
    return checked
      ? `calc(100% - ${knobWidth + current.padding}px)`
      : `${current.padding}px`;
  };

  return {
    checked,
    toggle,
    current,
    getKnobLeft,
  };
}
