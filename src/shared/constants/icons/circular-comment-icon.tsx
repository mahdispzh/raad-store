import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function CircularCommentIcon({
  size = "lg",
  color = "text-danger",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <g clipPath="url(#clip0_421_4215)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 8.125C4.635 8.125 4.2825 8.0825 3.94375 8.01031L2.4725 8.89469L2.49219 7.445C1.36437 6.76688 0.625 5.64563 0.625 4.375C0.625 2.30406 2.58375 0.625 5 0.625C7.41625 0.625 9.375 2.30406 9.375 4.375C9.375 6.44625 7.41625 8.125 5 8.125ZM5 0C2.23875 0 0 1.95906 0 4.375C0 5.75594 0.732813 6.98563 1.875 7.78719V10L4.06531 8.67094C4.36844 8.72094 4.68031 8.75 5 8.75C7.76125 8.75 10 6.79125 10 4.375C10 1.95906 7.76125 0 5 0Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_421_4215">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
