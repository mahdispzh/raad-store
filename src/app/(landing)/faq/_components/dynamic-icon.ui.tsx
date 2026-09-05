// ui/dynamic-icon.ui.tsx
"use client";
import { useDynamicIcon } from "../_hooks/useFaq";
import type { DynamicIconProps } from "../_types/faq-types";

// Dynamic icon component

export function DynamicIcon({
  type = "default",
  size = "lg",
  color = "text-primary",
}: DynamicIconProps) {
  const { IconComponent } = useDynamicIcon(type);
  return <IconComponent size={size} color={color} />;
}
