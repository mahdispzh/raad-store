// // src/shared/ui/quantity-selector/quantity-selector.constants.ts

// import { QuantitySelectorType, TypeClasses } from "./quantity-selector.types";

// export const TYPE_CLASSES: Record<QuantitySelectorType, TypeClasses> = {
//   primary: {
//     border: "border-secondary",
//     text: "primary",
//     iconColor: "text-primary",
//   },
//   secondary: {
//     border: "border-danger",
//     text: "danger",
//     iconColor: "text-danger",
//   },
// };

// export const SIZE_CLASSES: Record<QuantitySelectorType, TypeClasses> = {
//   md: {
//     container: "aspect-[4] h-[3.5vw] max-h-[45px] min-h-[40px] w-full",
//     icon: "sm",
//     padding: "p-3",
//     rounded: "rounded-sm",
//     borderWidth: "border-2",
//   },
//   lg: {
//     container: "aspect-[4] h-[3.5vw] max-h-[45px] min-h-[40px] w-full",
//     icon: "sm",
//     padding: "p-3",
//     rounded: "rounded-sm",
//     borderWidth: "border-2",
//   },
// };
// src/shared/ui/quantity-selector/quantity-selector.constants.ts
import {
  QuantitySelectorType,
  SizeSelectorType,
  TypeClasses,
} from "./quantity-selector.types";

export const TYPE_CLASSES: Record<QuantitySelectorType, TypeClasses> = {
  primary: {
    border: "border-secondary",
    text: "primary",
    iconColor: "text-primary",
  },
  secondary: {
    border: "border-danger",
    text: "danger",
    iconColor: "text-danger",
  },
};

// کلاس‌های سایز بر اساس اندازه
export const SIZE_CLASSES: Record<SizeSelectorType, any> = {
  md: {
    container: "aspect-[4] h-[0.5vw] max-h-[10px] min-h-[36px] w-full",
    padding: "px-2 py-1",
    icon: "sm",
    textSize: "sm",
    rounded: "rounded-sm",
    borderWidth: "border-2",
  },
  lg: {
    container: "aspect-[4] h-[3vw] max-h-[56px] min-h-[40px] w-full",
    padding: "px-3 py-2",
    icon: "md",
    textSize: "lg",
    rounded: "rounded-sm",
    borderWidth: "border-2",
  },
};
