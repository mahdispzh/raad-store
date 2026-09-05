"use client";

import { MinusIcon } from "../../constants/icons/minus-icon";
import { PlusEmptyIcon } from "../../constants/icons/plus-empty-icon";
import { Text } from "../text/text.ui";
import { SIZE_CLASSES } from "./quantity-selector.constants";
import { useQuantitySelector } from "./quantity-selector.hooks";
import { QuantitySelectorProps } from "./quantity-selector.types";

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  className = "",
  type = "primary",
  size = "md",
}: QuantitySelectorProps) {
  const { typeClasses } = useQuantitySelector(type);
  const sizeClasses = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div
      className={`flex w-full flex-row items-center justify-between ${sizeClasses.borderWidth} ${sizeClasses.rounded} ${sizeClasses.padding} ${sizeClasses.container} ${typeClasses.border} ${className}`}
    >
      <div
        onClick={onIncrease}
        className="cursor-pointer object-cover transition-transform hover:scale-105"
      >
        {/* <PlusEmptyIcon size={sizeClasses.icon} color={typeClasses.iconColor} /> */}
        <PlusEmptyIcon size="xs" color={typeClasses.iconColor} />
      </div>
      <Text
        text={String(quantity)}
        weight="bold"
        color={typeClasses.text}
        size={sizeClasses.textSize}
      />
      <div
        onClick={onDecrease}
        className="cursor-pointer object-cover transition-transform hover:scale-105"
      >
        {/* <MinusIcon size={sizeClasses.icon} color={typeClasses.iconColor} /> */}
        <MinusIcon size="xs" color={typeClasses.iconColor} />
      </div>
    </div>
  );
}
