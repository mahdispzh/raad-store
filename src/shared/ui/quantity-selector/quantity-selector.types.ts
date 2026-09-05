// // src/shared/ui/quantity-selector/quantity-selector.types.ts

// import { TextColor } from "../text/text.types";

// export type QuantitySelectorType = "primary" | "secondary";
// export type SizeSelectorType = "md" | "lg";

// export interface QuantitySelectorProps {
//   quantity: number;
//   onIncrease: () => void;
//   onDecrease: () => void;
//   className?: string;
//   type?: QuantitySelectorType;
// }

// export interface TypeClasses {
//   border: string;
//   text: TextColor; // استفاده از تایپ TextColor
//   iconColor: string;
// }
// src/shared/ui/quantity-selector/quantity-selector.types.ts
import { TextColor } from "../text/text.types";

export type QuantitySelectorType = "primary" | "secondary";
export type SizeSelectorType = "md" | "lg";

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
  type?: QuantitySelectorType;
  size?: SizeSelectorType; // ← اضافه شد
}

export interface TypeClasses {
  border: string;
  text: TextColor;
  iconColor: string;
}
