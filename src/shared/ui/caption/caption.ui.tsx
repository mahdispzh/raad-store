import type { CaptionProps } from "./caption.types";
import { useCaption } from "./useCaption";

export function Caption({
  text,
  size = "xs",
  weight = "regular",
  color = "primary",
}: CaptionProps) {
  const { className } = useCaption(size, weight, color);

  return <span className={className}>{text}</span>;
}
