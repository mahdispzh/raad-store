"use client";

import { DropdownArrowIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { ColorFilterProps } from "../_types/landing-products.types";
import { ColorFilterContent } from "./color-filter-content";

interface ExtendedColorFilterProps extends ColorFilterProps {
  hideHeader?: boolean;
}

export function ColorFilter({
  show,
  setShow,
  selectedColorIds,
  onToggleColor,
  colors,
  hideHeader = false,
}: ExtendedColorFilterProps) {
  const content = (
    <ColorFilterContent
      selectedColorIds={selectedColorIds}
      onToggleColor={onToggleColor}
      colors={colors}
    />
  );

  if (hideHeader) {
    return content;
  }

  return (
    <>
      <div
        className="flex cursor-pointer justify-between px-[0.5vw]"
        onClick={() => setShow(!show)}
      >
        <Text text="رنگ" size="md" weight="medium" />
        <div
          className={`transition-transform duration-300 ${
            show ? "rotate-180" : "rotate-0"
          }`}
        >
          <DropdownArrowIcon size="xs" />
        </div>
      </div>
      {show && content}
    </>
  );
}
