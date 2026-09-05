export type DotSize = "sm" | "md" | "lg";

export type DotColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "gray"
  | "white";

export interface DotProps {
  size?: DotSize;
  color?: DotColor;

  className?: string;
}
