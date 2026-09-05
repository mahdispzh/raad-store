// _types/subtitle._types.ts
export type SubtitleSize = "xl" | "2xl" | "3xl" | "4xl";

export type SubtitleWeight = "light" | "regular" | "medium" | "bold";

export type SubtitleColor =
  | "primary"
  | "secondary"
  | "white"
  | "danger"
  | "success";

export type SubtitleProps = {
  text: string;
  size?: SubtitleSize;
  weight?: SubtitleWeight;
  color?: SubtitleColor;
};
