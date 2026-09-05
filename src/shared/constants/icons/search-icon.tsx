import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function SearchIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 19 19"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M8.47109 3.76496C11.0702 3.76496 13.1773 5.87201 13.1773 8.47117M13.7974 13.7938L17.8835 17.8836M16.001 8.47117C16.001 12.6299 12.6298 16.0011 8.47109 16.0011C4.31242 16.0011 0.941162 12.6299 0.941162 8.47117C0.941162 4.3125 4.31242 0.941241 8.47109 0.941241C12.6298 0.941241 16.001 4.3125 16.001 8.47117Z"
        stroke="currentColor"
        strokeWidth="1.88248"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
