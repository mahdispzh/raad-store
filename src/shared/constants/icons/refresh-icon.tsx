import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function RefreshIcon({
  size = "lg",
  color = "text-warning",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M14.0001 1V4.61114M14.0001 4.61114H10.389M14.0001 4.61114L11.8334 2.65512C10.6834 1.62585 9.16486 1 7.50005 1C3.91017 1 1 3.91017 1 7.50005C1 11.09 3.91017 14.0001 7.50005 14.0001C10.5935 14.0001 13.1822 11.8392 13.839 8.94451"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
