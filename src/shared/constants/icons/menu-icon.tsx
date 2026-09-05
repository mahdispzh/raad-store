import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function MenuIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 17 13"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M0.919922 0.919922H15.6615M0.919922 6.43992H15.6615M0.919922 11.9599H15.6615"
        stroke="currentColor"
        strokeWidth="1.84"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
