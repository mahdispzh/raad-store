import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";
export function ArrowIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 9 5"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M0.500732 0.500488L8.10327 0.500488L4.30249 3.76709L0.500732 0.500488Z"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
