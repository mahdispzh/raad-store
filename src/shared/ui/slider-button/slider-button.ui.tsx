// ui/slider-button.ui.tsx
"use client";

import type { SliderButtonProps } from "./slider-button.types";
import { useSliderButton } from "./useSliderButton";

export function SliderButton({
  count,
  activeIndex,
  onChange,
}: SliderButtonProps) {
  const { getButtonClass } = useSliderButton(activeIndex);

  return (
    <div className="flex items-center gap-[0.52vw]">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={getButtonClass(index)}
        />
      ))}
    </div>
  );
}
