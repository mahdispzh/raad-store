import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function DropleftArrowIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 5 9"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M4.37215 8.17984L0.564453 4.37214L4.37215 0.564453"
        stroke="currentColor"
        strokeWidth="1.12821"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
