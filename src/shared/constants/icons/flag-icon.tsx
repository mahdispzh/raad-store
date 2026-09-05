// constants/icons/flag-icon.tsx
import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function FlagIcon({ size = "lg", color = "text-secondary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M4 21V4M4 4H16.5C16.5 4 18 6 15.5 8C13 10 15.5 12 15.5 12H4M4 4V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}