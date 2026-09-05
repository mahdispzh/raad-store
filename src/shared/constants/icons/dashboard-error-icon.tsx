import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ErrorIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <rect
        x="0.5"
        y="0.5"
        width="26"
        height="25"
        rx="4.5"
        stroke="currentColor"
      />
      <path
        d="M20.4246 7L7 21"
        stroke="currentColor"
        strokeWidth="1.88"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7L20.4246 21"
        stroke="currentColor"
        strokeWidth="1.88"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
