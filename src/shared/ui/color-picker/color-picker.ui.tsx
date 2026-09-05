"use client";

import { useState } from "react";
import { DismissIcon } from "@/src/shared/constants/icons";
import { Caption } from "@/src/shared/ui";

type ColorPickerProps = {
  colors: string[];
  expanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  visibleLimit?: number;
  onColorSelect?: (color: string) => void;
  selectedColor?: string;
};

export function ColorPicker({
  colors,
  expanded = false,
  onExpand,
  onCollapse,
  visibleLimit = 3,
  onColorSelect,
  selectedColor,
}: ColorPickerProps) {
  const handleColorClick = (color: string) => {
    if (onColorSelect) {
      onColorSelect(color);
    }
  };

  // نمایش همیشه به صورت گرید ۳ ستونه
  const displayColors = expanded ? colors : colors.slice(0, visibleLimit);
  const extraCount = colors.length - visibleLimit;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid max-h-24 grid-cols-3 gap-2 overflow-y-auto p-1">
        {displayColors.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleColorClick(c)}
            className={`h-6 w-6 rounded-xs transition-all hover:scale-110 cursor-pointer ${
              selectedColor === c ? "ring-3 ring-gray ring-offset-1" : ""
            }`}
            style={{ backgroundColor: c }}
            aria-label={`انتخاب رنگ ${c}`}
          />
        ))}
      </div>

      {/* کنترل‌های expand/collapse */}
      {!expanded && extraCount > 0 ? (
        <button
          type="button"
          onClick={onExpand}
          className="rounded-xs bg-accent px-1.5 py-0.5 cursor-pointer hover:bg-accent/80"
        >
          <Caption
            text={`+${extraCount}`}
            size="xs"
            weight="regular"
            color="secondary"
          />
        </button>
      ) : expanded ? (
        <button
          type="button"
          aria-label="بستن رنگ‌ها"
          onClick={onCollapse}
          className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-secondary cursor-pointer hover:bg-accent/80"
        >
          <DismissIcon />
        </button>
      ) : null}
    </div>
  );
}