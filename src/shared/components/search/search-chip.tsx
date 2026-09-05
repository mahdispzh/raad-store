"use client";

import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { RecycleBinIcon } from "@/src/shared/constants/icons/recycle-bin-icon";
import { ReplyIcon } from "@/src/shared/constants/icons/reply-icon";
import type { SearchChipProps } from "./search.types";

export function SearchChip({
  label,
  variant = "popular",
  onClick,
  onRemove,
  iconPosition = "right",
}: SearchChipProps) {
  const baseClass =
    "flex items-center transition-all duration-200 text-xs text-secondary text-regular";

  /*
   -----------------------------------
   CLEAR ALL
   -----------------------------------
  */

  if (variant === "clear-all") {
    return (
      <button onClick={onClick} className={`${baseClass} cursor-pointer gap-2`}>
        {iconPosition === "left" && (
          <RecycleBinIcon size="xs" color="text-secondary" />
        )}

        <span>{label}</span>

        {iconPosition === "right" && (
          <RecycleBinIcon size="xs" color="text-secondary" />
        )}
      </button>
    );
  }

  /*
   -----------------------------------
   RECENT SEARCH (دکمه دو قسمتی)
   -----------------------------------
  */

  if (variant === "recent") {
    return (
      <div
        className={`${baseClass} h-4.5 overflow-hidden rounded-full border border-primary/15 bg-white md:h-[2.5vw] lg:h-[1.7vw]`}
      >
        {/* قسمت راست - آیکون حذف */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="flex h-full cursor-pointer items-center justify-center px-2 transition-all duration-200"
          aria-label="حذف"
        >
          <CloseIcon size="2xs" color="text-secondary" />
        </button>
        {/* خط جداکننده */}
        <div className="h-4 w-[1px] bg-gray-300" />

        {/* قسمت چپ - متن (کلیک اصلی) */}
        <button
          onClick={onClick}
          className="flex h-full cursor-pointer items-center justify-center px-4 transition-all duration-200"
        >
          <span>{label}</span>
        </button>
      </div>
    );
  }

  /*
   -----------------------------------
   POPULAR SEARCH
   -----------------------------------
  */

  return (
    <button
      onClick={onClick}
      className={`${baseClass} h-4.5 cursor-pointer gap-3 rounded-full border border-primary/15 bg-white px-4 md:h-[2.5vw] lg:h-[1.7vw]`}
    >
      {iconPosition === "left" && (
        <ReplyIcon size="xs" color="text-secondary" />
      )}

      <span>{label}</span>

      {iconPosition === "right" && (
        <ReplyIcon size="xs" color="text-secondary" />
      )}
    </button>
  );
}
