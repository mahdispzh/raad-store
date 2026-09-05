// _types/text-red-line._types.ts
export type TextSize = "sm" | "md" | "lg";

export type TextWeight = "light" | "regular" | "medium" | "bold";

export type TextColor =
  | "primary"
  | "secondary"
  | "white"
  | "danger"
  | "success";

export type TextRedLineProps = {
  text: string;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  isUnderline?: boolean;
  className?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
