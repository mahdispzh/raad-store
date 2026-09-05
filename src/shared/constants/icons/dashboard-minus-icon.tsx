import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DashboardMinusIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <rect
        x="0.5"
        y="0.5"
        width="26"
        height="25"
        rx="4.5"
        stroke="currentColor"
      />
      <path
        d="M14.7304 17.2956H12.687L12.4609 6.78259H14.9652L14.7304 17.2956ZM15.3304 20.4261L13.6696 22.0869L12 20.4174L13.6609 18.7565L15.3304 20.4261Z"
        fill="currentColor"
      />
    </svg>
  );
}
