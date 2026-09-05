import type { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function CloseIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      viewBox="0 0 18 19"
    >
      <path
        d="M16.9399 0.940002L0.939941 17.6258"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.88"
      />
      <path
        d="M0.939941 0.940002L16.9399 17.6258"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.88"
      />
    </svg>
  );
}
