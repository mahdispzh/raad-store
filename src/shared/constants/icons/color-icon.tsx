import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ColorIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M18.0711 3.92893C16.1957 2.05357 13.6521 1 11 1C8.34783 1 5.8043 2.05357 3.92893 3.92893C2.05357 5.8043 1 8.34783 1 11C1 13.6521 2.05357 16.1957 3.92893 18.0711L11 11L18.0711 3.92893Z"
        fill="currentColor"
      />
      <path
        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
