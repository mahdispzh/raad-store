// _types/text._types.ts
export type TextSize = "sm" | "md" | "lg";

export type TextWeight = "light" | "regular" | "medium" | "bold";

export type TextColor =
  | "primary"
  | "secondary"
  | "white"
  | "danger"
  | "success"
  | "accent"
  | "gray"
  | "black";

export type TextAlign = "left" | "center" | "right" | "justify";

export type TextProps = {
  text: string;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
};
