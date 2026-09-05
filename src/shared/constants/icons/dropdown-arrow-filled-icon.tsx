import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function DropdownArrowFilledIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 9 5"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M0.500732 0.500488L8.10327 0.500488L4.30249 3.76709L0.500732 0.500488Z"
        fill="#595757"
        stroke="currentColor"
      />
    </svg>
  );
}
