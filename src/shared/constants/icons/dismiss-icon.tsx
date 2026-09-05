import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DismissIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="6" fill="currentColor" />
      <path
        d="M8.25 3.75L3.75 8.25"
        stroke="#FBFBFB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 3.75L8.25 8.25"
        stroke="#FBFBFB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}