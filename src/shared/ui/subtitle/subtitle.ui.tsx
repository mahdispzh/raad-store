// ui/subtitle.ui.tsx
import type {
  SubtitleColor,
  SubtitleProps,
  SubtitleSize,
  SubtitleWeight,
} from "./subtitle.types";

const sizeStyles: Record<SubtitleSize, string> = {
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const weightStyles: Record<SubtitleWeight, string> = {
  light: "text-light",
  regular: "text-regular",
  medium: "text-medium",
  bold: "text-bold",
};

const colorStyles: Record<SubtitleColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  danger: "text-danger",
  success: "text-success",
};

export function Subtitle({
  text,
  size = "xl",
  weight = "medium",
  color = "primary",
}: SubtitleProps) {
  return (
    <h6
      className={` ${sizeStyles[size]} ${weightStyles[weight]} ${colorStyles[color]} `}
    >
      {text}
    </h6>
  );
}
