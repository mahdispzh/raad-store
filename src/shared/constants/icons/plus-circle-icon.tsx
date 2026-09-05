import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function PlusCircleIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 33 33"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <rect x="0.5" y="0.5" width="32" height="32" rx="16" fill="white" />
      <rect
        x="0.5"
        y="0.5"
        width="32"
        height="32"
        rx="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 3"
      />
      <path
        d="M16.4999 11.8333V21.1667M11.8333 16.5H21.1666"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
