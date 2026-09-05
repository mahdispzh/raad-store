import { TitleProps } from "./title.types";

const sizeClassMap: Record<"3xl" | "4xl" | "2xl", string> = {
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "2xl": "text-2xl",
};

const iconSizeMap: Record<"3xl" | "4xl" | "2xl", "lg" | "xl" | "lg"> = {
  "3xl": "lg",
  "4xl": "xl",
  "2xl": "lg",
};

export function useTitle({
  variant,
  size = "3xl",
}: Pick<TitleProps, "variant" | "size">) {
  const isUnderlined =
    variant === "underlined" ||
    variant === "featured" ||
    variant === "underlined-secondary";

  const isFeatured = variant === "featured";
  const isSecondaryUnderline = variant === "underlined-secondary";

  return {
    isUnderlined,
    isFeatured,
    isSecondaryUnderline,
    sizeClass: sizeClassMap[size],
    iconSize: iconSizeMap[size],
  };
}
