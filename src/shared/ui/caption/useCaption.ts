// _hooks/use-caption.ts

import { colorStyles, sizeStyles, weightStyles } from "./caption.constants";
import { CaptionColor, CaptionSize, CaptionWeight } from "./caption.types";

// هوک مدیریت منطق کپشن
export function useCaption(
  size: CaptionSize = "xs",
  weight: CaptionWeight = "regular",
  color: CaptionColor = "primary",
) {
  const sizeClass = sizeStyles[size];
  const weightClass = weightStyles[weight];
  const colorClass = colorStyles[color];

  const className = `${sizeClass} ${weightClass} ${colorClass}`.trim();

  return {
    className,
  };
}
