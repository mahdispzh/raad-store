"use client";

import { Caption } from "@/src/shared/ui";
import { DismissIcon } from "@/src/shared/constants/icons";

type SizePickerProps = {
  sizes: string[];
  expanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  visibleLimit?: number;
  onSizeSelect?: (size: string) => void;
  selectedSize?: string;
};

export function SizePicker({
  sizes,
  expanded = false,
  onExpand,
  onCollapse,
  visibleLimit = 3,
  onSizeSelect,
  selectedSize,
}: SizePickerProps) {
  const handleSizeClick = (size: string) => {
    if (onSizeSelect) {
      onSizeSelect(size);
    }
  };

  const displaySizes = expanded ? sizes : sizes.slice(0, visibleLimit);
  const extraCount = sizes.length - visibleLimit;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid max-h-24 grid-cols-3 gap-2 overflow-y-auto p-1">
        {displaySizes.map((s, i) => (
          <button
            key={`${s}-${i}`}
            type="button"
            onClick={() => handleSizeClick(s)}
            className={`w-8 rounded-xs px-2 py-0.5 text-center transition-all hover:scale-105 cursor-pointer ${
              selectedSize === s
                ? "bg-secondary text-accent ring-3 ring-offset-1 ring-gray"
                : "bg-secondary text-accent"
            }`}
          >
            <Caption text={s} size="xs" weight="regular" color="accent"/>
          </button>
        ))}
      </div>

      {!expanded && extraCount > 0 ? (
        <button
          type="button"
          onClick={onExpand}
          className="rounded-xs bg-accent px-2 py-0.5 cursor-pointer"
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
          aria-label="بستن سایزها"
          onClick={onCollapse}
          className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-secondary cursor-pointer"
        >
          <DismissIcon />
        </button>
      ) : null}
    </div>
  );
}