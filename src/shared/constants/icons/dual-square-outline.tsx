import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function DualSquareOutline({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect x="2.5" y="0.5" width="17" height="17" rx="4.5" stroke="#595757" />
      <rect
        x="0.5"
        y="2.5"
        width="17"
        height="17"
        rx="4.5"
        fill="#FBFBFB"
        stroke="#595757"
      />
    </svg>
  );
}
