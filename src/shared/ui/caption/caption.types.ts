// _types/caption._types.ts
export type CaptionSize = "2xs" | "xs";
export type CaptionWeight = "light" | "regular" | "medium" | "bold";
export type CaptionColor =
  | "primary"
  | "secondary"
  | "white"
  | "danger"
  | "success"
  | "gray"
  | "accent"
  ;

export interface CaptionProps {
  text: string;
  size?: CaptionSize;
  weight?: CaptionWeight;
  color?: CaptionColor;
}
