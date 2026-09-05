import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ClockIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 23 25"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M10.7064 13.8574V9.22587M21.4907 5.75218L19.0942 3.43639M8.3099 1.12061H13.1029M10.7064 23.1206C5.41218 23.1206 1.12036 18.9734 1.12036 13.8574C1.12036 8.74154 5.41218 4.59429 10.7064 4.59429C16.0007 4.59429 20.2925 8.74154 20.2925 13.8574C20.2925 18.9734 16.0007 23.1206 10.7064 23.1206Z"
        stroke="currentColor"
        strokeWidth="2.24074"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
