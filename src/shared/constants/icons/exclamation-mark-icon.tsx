import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ExclamationMarkIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 4 16"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M2.73043 10.513H0.686957L0.46087 0H2.96522L2.73043 10.513ZM3.33043 13.6435L1.66957 15.3043L0 13.6348L1.66087 11.9739L3.33043 13.6435Z"
        fill="currentColor"
      />
    </svg>
  );
}
