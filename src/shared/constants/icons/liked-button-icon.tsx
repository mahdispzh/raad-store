import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function LikedButtonIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      viewBox="0 0 19 19"
      fill="none"
    >
      <path
        d="M4.75 7.51001V17.51M4.75 7.51001L0.75 7.50999V17.51H4.75M4.75 7.51001L9.9456 1.44848C10.4386 0.873311 11.2142 0.626051 11.9492 0.809781L11.9967 0.821671C13.3385 1.15712 13.9429 2.72058 13.1758 3.87136L10.75 7.50999H15.3104C16.5725 7.50999 17.5191 8.66461 17.2716 9.90221L16.0716 15.9022C15.8846 16.8371 15.0638 17.51 14.1104 17.51H4.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
