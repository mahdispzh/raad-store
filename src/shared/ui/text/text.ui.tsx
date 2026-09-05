import type {
  TextAlign,
  TextColor,
  TextProps,
  TextSize,
  TextWeight,
} from "./text.types";

const sizeStyles: Record<TextSize, string> = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

const weightStyles: Record<TextWeight, string> = {
  light: "text-light",
  regular: "text-regular",
  medium: "text-medium",
  bold: "text-bold",
};

const colorStyles: Record<TextColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  danger: "text-danger",
  success: "text-success",
  accent: "text-accent",
  gray: "text-gray",
  black: "text-black",
};

const alignStyles: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export function Text({
  text,
  size = "md",
  weight = "regular",
  color = "primary",
  align = "justify",
}: TextProps) {
  return (
    <p
      className={`${sizeStyles[size]} ${weightStyles[weight]} ${
        colorStyles[color]
      } ${alignStyles[align]}`}
    >
      {text}
    </p>
  );
}