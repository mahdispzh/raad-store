// _types/price._types.ts
export type SizeType = "xs" | "md" | "lg" | "xl" | "2xl";

export interface PriceProps {
  price?: number;
  discount?: number;
  size?: SizeType;
}
