import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function PriceIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="6"
        cy="6"
        r="5.6"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M6.09375 3V3.75M6.09375 3.75C6.84375 3.75 7.28125 4 7.40625 4.5M6.09375 3.75C4.96875 3.75 4.78125 4.4837 4.78125 4.875C4.78125 6.42762 7.40625 5.61185 7.40625 7.125C7.40625 7.5163 7.21875 8.25 6.09375 8.25M6.09375 8.25V9M6.09375 8.25C5.34375 8.25 4.90625 8 4.78125 7.5"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}