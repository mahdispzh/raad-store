import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function WaitingIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 13 12"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M6.22286 0.578857V1.92247M6.22286 9.04363V11.1934M2.60444 5.81895H0.578125M11.5781 5.81895H10.7097M9.96118 9.28929L9.55181 8.90927M10.0811 2.2803L9.26234 3.04036M2.12482 9.62321L3.76234 8.1031M2.24473 2.16899L3.47286 3.30908"
        stroke="currentColor"
        strokeWidth="1.15789"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
