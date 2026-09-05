import { IconProps } from "../../types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DiscountBoxIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M8.75 0.75H2.75C1.64543 0.75 0.75 1.74492 0.75 2.97222V8.52777C0.75 9.7551 1.64543 10.75 2.75 10.75H8.75C9.85455 10.75 10.75 9.7551 10.75 8.52777V2.97222C10.75 1.74492 9.85455 0.75 8.75 0.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.25 8.52777L8.25 2.97223"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 5.19444C4.30229 5.19444 4.75 4.697 4.75 4.08334C4.75 3.46969 4.30229 2.97223 3.75 2.97223C3.19771 2.97223 2.75 3.46969 2.75 4.08334C2.75 4.697 3.19771 5.19444 3.75 5.19444Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 8.52776C8.3023 8.52776 8.75 8.03032 8.75 7.41665C8.75 6.80304 8.3023 6.30554 7.75 6.30554C7.1977 6.30554 6.75 6.80304 6.75 7.41665C6.75 8.03032 7.1977 8.52776 7.75 8.52776Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
