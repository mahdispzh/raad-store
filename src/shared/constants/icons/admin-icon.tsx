import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function AdminIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 13 17"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M9.92843 3.90265C9.92843 5.78189 8.39338 7.30531 6.49986 7.30531C4.60631 7.30531 3.07129 5.78189 3.07129 3.90265C3.07129 2.02342 4.60631 0.5 6.49986 0.5C8.39338 0.5 9.92843 2.02342 9.92843 3.90265Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 9.85737C3.18629 9.85737 0.5 12.5233 0.5 15.812H12.5C12.5 12.5233 9.81371 9.85737 6.5 9.85737Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
