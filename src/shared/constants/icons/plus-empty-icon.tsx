import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function PlusEmptyIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M1 7H13M7 1V13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
