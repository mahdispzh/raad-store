"use client";

import { Caption } from "@/src/shared/ui";
import { FilterColorProps } from "../_types";

export function FilterColor({
  color,
  name,
  selected,
  onClick,
}: FilterColorProps) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer flex-col items-center gap-[0.4vw]"
    >
      <div
        className={`h-[2.5vw] w-[2.5vw] rounded-[8px] border border-gray transition-all ${
          selected ? "ring-2 ring-secondary ring-offset-2" : ""
        }`}
        style={{ backgroundColor: color }}
      />
      <Caption text={name} size="xs" weight="regular" />
    </button>
  );
}
