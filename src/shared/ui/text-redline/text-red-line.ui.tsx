// ui/text-red-line.ui.tsx

import type { TextRedLineProps } from "./text-red-line.types";
import { useTextRedLine } from "./useTextRedLine";

// TODO remove
export function TextRedLine({
  text,
  size = "md",
  weight = "regular",
  color = "primary",
  isUnderline = false,
  className = "",
  as: Component = "p",
}: TextRedLineProps) {
  const { finalClassName } = useTextRedLine({
    size,
    weight,
    color,
    isUnderline,
    className,
  });

  return (
    <div>
      <Component className={finalClassName} style={{ display: "inline-block" }}>
        {text}
      </Component>
    </div>
  );
}
