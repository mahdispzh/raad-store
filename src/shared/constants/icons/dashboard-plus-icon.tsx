import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DashboardPlusIcon({
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
        d="M23.4213 21.993H31.2004V23.9651H23.4213V32.433H21.2926V23.9651H13.6543V21.993H21.2926V13.8069H23.4213V21.993Z"
        fill="white"
      />
    </svg>
  );
}
