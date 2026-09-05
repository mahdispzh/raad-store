import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function AddLocationIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.25 8.25C14.25 11.5637 11.5637 14.25 8.25 14.25C4.93629 14.25 2.25 11.5637 2.25 8.25C2.25 4.93629 4.93629 2.25 8.25 2.25C11.5637 2.25 14.25 4.93629 14.25 8.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 8.25C10.5 9.49268 9.49268 10.5 8.25 10.5C7.00732 10.5 6 9.49268 6 8.25C6 7.00732 7.00732 6 8.25 6C9.49268 6 10.5 7.00732 10.5 8.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M0.75 8.25H2.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.25 8.25H15.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.25 2.25V0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.25 15.75V14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}