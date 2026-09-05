import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ImageOffIcon({
  size = "lg",
  color = "text-gray-400",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M3 7.5C3 5.84315 4.34315 4.5 6 4.5H18C19.6569 4.5 21 5.84315 21 7.5V16.5C21 18.1569 19.6569 19.5 18 19.5H6C4.34315 19.5 3 18.1569 3 16.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M7.5 15L10 12.5C10.4142 12.0858 11.0858 12.0858 11.5 12.5L13 14L16 11C16.4142 10.5858 17.0858 10.5858 17.5 11L19.5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />

      {/* خط ضربدر */}
      <path
        d="M4 4L20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
