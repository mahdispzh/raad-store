import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function MoreVerticalIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 4 15"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M1.66659 8.33334C2.12682 8.33334 2.49992 7.96024 2.49992 7.5C2.49992 7.03977 2.12682 6.66667 1.66659 6.66667C1.20635 6.66667 0.833252 7.03977 0.833252 7.5C0.833252 7.96024 1.20635 8.33334 1.66659 8.33334Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66659 2.5C2.12682 2.5 2.49992 2.12691 2.49992 1.66667C2.49992 1.20643 2.12682 0.833336 1.66659 0.833336C1.20635 0.833336 0.833252 1.20643 0.833252 1.66667C0.833252 2.12691 1.20635 2.5 1.66659 2.5Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66659 14.1667C2.12682 14.1667 2.49992 13.7936 2.49992 13.3333C2.49992 12.8731 2.12682 12.5 1.66659 12.5C1.20635 12.5 0.833252 12.8731 0.833252 13.3333C0.833252 13.7936 1.20635 14.1667 1.66659 14.1667Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
