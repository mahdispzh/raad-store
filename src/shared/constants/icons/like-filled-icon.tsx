import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function LikeFilledIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 20 18"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M0 5.85219C0 10.7151 4.01943 13.3065 6.96173 15.626C8 16.4445 9 17.2151 10 17.2151C11 17.2151 12 16.4445 13.0383 15.626C15.9806 13.3065 20 10.7151 20 5.85219C20 0.98925 14.4998 -2.45945 10 2.21572C5.50016 -2.45945 0 0.98925 0 5.85219Z"
        fill="currentColor"
      />
    </svg>
  );
}
