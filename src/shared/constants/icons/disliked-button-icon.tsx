import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function DislikedButtonIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 19 19"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M4.75 10.75V0.75M4.75 0.75L14.1104 0.75002C15.0638 0.75002 15.8846 1.42294 16.0716 2.35779L17.2716 8.3578C17.5191 9.5954 16.5725 10.75 15.3104 10.75H10.75L13.1758 14.3887C13.9429 15.5394 13.3385 17.1029 11.9967 17.4383L11.9492 17.4502C11.2142 17.634 10.4386 17.3867 9.9456 16.8115L4.75 10.75H0.75V0.75002L4.75 0.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
