import { IconProps } from "../../types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DashboardRefreshIcon({
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
      <path
        d="M16.389 10.6111H20.0001V7M20.0001 10.6111L17.8334 8.65512C16.6834 7.62585 15.1649 7 13.5001 7C9.91017 7 7 9.91017 7 13.5001C7 17.09 9.91017 20.0001 13.5001 20.0001C16.5935 20.0001 19.1822 17.8392 19.839 14.9445"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="0.5"
        y="0.5"
        width="26"
        height="25"
        rx="4.5"
        stroke="currentColor"
      />
    </svg>
  );
}
