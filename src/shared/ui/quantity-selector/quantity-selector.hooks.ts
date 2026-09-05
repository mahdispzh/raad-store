// src/shared/ui/quantity-selector/quantity-selector.hooks.ts

import { QuantitySelectorType } from "./quantity-selector.types";
import { TYPE_CLASSES } from "./quantity-selector.constants";

export function useQuantitySelector(type: QuantitySelectorType = "primary") {
  const typeClasses = TYPE_CLASSES[type];
  
  return {
    typeClasses,
  };
}