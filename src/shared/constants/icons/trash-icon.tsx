import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function TrashIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 23 26"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M8.62842 12.7169V19.2271"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7141 12.7169V19.2271"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 6.20752H21.3418"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.54272 10.1131V20.5286C3.54272 22.6858 5.25035 24.4344 7.35681 24.4344H14.985C17.0915 24.4344 18.7991 22.6858 18.7991 20.5286V10.1131"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.35718 3.60409C7.35718 2.16589 8.4955 1 9.89969 1H12.4422C13.8464 1 14.9847 2.16589 14.9847 3.60409V6.20818H7.35718V3.60409Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
