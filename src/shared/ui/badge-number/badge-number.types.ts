export type BadgeNumberSize = "xs" | "sm" | "md" | "lg";

export type BadgeNumberVariant = "square" | "circle";

export interface BadgeNumberProps {
  value?: string | number;

  size?: BadgeNumberSize;
  variant?: BadgeNumberVariant;

  className?: string;
}
