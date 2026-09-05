import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DashboardSuccessIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 45 45"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <rect x="4" y="4" width="37" height="37" rx="10" fill="currentColor" />
      <path
        d="M13 23.5833L19.4615 30L34 15.5625"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
