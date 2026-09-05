import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function SupportIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M9.5 16H10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M4 13H3.5C2.1195 13 1 11.8805 1 10.5C1 9.1195 2.1195 8 3.5 8H4V13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 13H13V8H13.5C14.8805 8 16 9.1195 16 10.5C16 11.8805 14.8805 13 13.5 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M3 8V6.5C3 3.4625 5.4625 1 8.5 1C11.5375 1 14 3.4625 14 6.5V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M14 13V15C14 15.5525 13.5525 16 13 16H11.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
    </svg>
  );
}
