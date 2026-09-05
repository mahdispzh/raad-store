import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ChatIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M4.625 15.5C6.90317 15.5 8.75 13.6532 8.75 11.375C8.75 9.09683 6.90317 7.25 4.625 7.25C2.34683 7.25 0.5 9.09683 0.5 11.375C0.5 12.1263 0.700876 12.8308 1.05185 13.4375L0.70625 15.2937L2.5625 14.9481C3.16923 15.2991 3.87366 15.5 4.625 15.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4618 12.4233C11.194 12.3053 11.8819 12.0549 12.5 11.6973L15.2 12.2L14.6973 9.5C15.2078 8.61748 15.5 7.59286 15.5 6.5C15.5 3.18629 12.8137 0.5 9.5 0.5C6.47947 0.5 3.98024 2.73199 3.56166 5.63663"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}