import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function ExportIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
      />
      <path
        d="M12.5 6C12.5 5.72386 12.2761 5.5 12 5.5L7.5 5.5C7.22386 5.5 7 5.72386 7 6C7 6.27614 7.22386 6.5 7.5 6.5L11.5 6.5L11.5 10.5C11.5 10.7761 11.7239 11 12 11C12.2761 11 12.5 10.7761 12.5 10.5L12.5 6ZM6 12L6.35355 12.3536L12.3536 6.35355L12 6L11.6464 5.64645L5.64645 11.6464L6 12Z"
        fill="currentColor"
      />
    </svg>
  );
}