import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ReplyIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M8.33464 0H5.68271V0.757694H7.04121L4.16732 3.63159L2.54093 2.00524C2.46988 1.93421 2.37354 1.89432 2.27308 1.89432C2.17263 1.89432 2.07628 1.93421 2.00524 2.00524L0 4.0104L0.535765 4.54616L2.27308 2.80881L3.89947 4.43516C3.97052 4.50619 4.06686 4.54608 4.16732 4.54608C4.26777 4.54608 4.36412 4.50619 4.43516 4.43516L6.00605 2.86429L7.57694 1.29342V2.65193H8.33464V0Z"
        fill="currentColor"
      />
    </svg>
  );
}
