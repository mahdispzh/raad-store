import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function PlusIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <g style={{ mixBlendMode: "multiply" }}>
        <rect width="28" height="28" rx="14" fill="#E8E5E5" />
        <path
          d="M14 10.5V17.5M10.5 14H17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
