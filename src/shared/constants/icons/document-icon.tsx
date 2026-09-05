import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DocumentIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0996 16.5996L16.5996 10.5996V3.59961C16.5996 1.94276 15.2565 0.599609 13.5996 0.599609H3.59961C1.94276 0.599609 0.599609 1.94276 0.599609 3.59961V13.5996C0.599609 15.2565 1.94276 16.5996 3.59961 16.5996H10.0996ZM16.5996 10.5996H12.0996C10.995 10.5996 10.0996 11.495 10.0996 12.5996V16.5996"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.59961 4.59961H12.5996"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.59961 8.59961H8.59961"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}