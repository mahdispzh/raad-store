import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DashboardUserIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 51 51"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <circle cx="25.5" cy="25.5" r="25" stroke="currentColor" />
      <circle cx="25.5" cy="25.5" r="19.5" fill="currentColor" />
      <path
        d="M31.1412 18.448C31.1412 21.2668 28.8386 23.552 25.9983 23.552C23.158 23.552 20.8555 21.2668 20.8555 18.448C20.8555 15.6291 23.158 13.344 25.9983 13.344C28.8386 13.344 31.1412 15.6291 31.1412 18.448Z"
        stroke="#595757"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 27.38C21.0294 27.38 17 31.379 17 36.312H35C35 31.379 30.9706 27.38 26 27.38Z"
        stroke="#595757"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
