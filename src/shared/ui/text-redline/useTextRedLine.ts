// _hooks/use-text-red-line.ts

import { TextRedLineProps } from "./text-red-line.types";

const sizeStyles: Record<NonNullable<TextRedLineProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

const weightStyles: Record<NonNullable<TextRedLineProps["weight"]>, string> = {
  light: "text-light",
  regular: "text-regular",
  medium: "text-medium",
  bold: "text-bold",
};

const colorStyles: Record<NonNullable<TextRedLineProps["color"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
  danger: "text-danger",
  success: "text-success",
};

export function useTextRedLine({
  size = "md",
  weight = "regular",
  color = "primary",
  isUnderline = false,
  className = "",
}: Pick<
  TextRedLineProps,
  "size" | "weight" | "color" | "isUnderline" | "className"
>) {
  const sizeClass = sizeStyles[size];
  const weightClass = weightStyles[weight];
  const colorClass = colorStyles[color];

  const underlineClass = isUnderline
    ? 'relative after:absolute after:bottom-[-5px] after:left-0 after:h-[1.5px] after:w-full after:rounded-full after:bg-danger after:content-[""]'
    : "";

  const finalClassName = `${sizeClass} ${weightClass} ${colorClass} ${underlineClass} relative inline-block ${className}`;

  return {
    finalClassName,
  };
}
