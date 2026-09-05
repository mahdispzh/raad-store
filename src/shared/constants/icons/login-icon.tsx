import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function LoginIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 18 23"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M16.314 11.1667L6.99902 11.1677M6.99902 11.1677L10.6449 14.2927M6.99902 11.1677L10.6449 8.04272"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.2898 16.375C14.2772 18.6407 14.1767 19.8676 13.3763 20.668C12.461 21.5833 10.9879 21.5833 8.04162 21.5833L6.99995 21.5833C4.0537 21.5833 2.58047 21.5833 1.66526 20.668C0.749951 19.7528 0.74995 18.2796 0.749951 15.3333L0.749951 7C0.749952 4.05375 0.749952 2.58063 1.66526 1.66532C2.58047 0.750005 4.0537 0.750005 6.99995 0.750005L8.04162 0.750005C10.9879 0.750005 12.461 0.750006 13.3763 1.66532C14.1767 2.46573 14.2772 3.69271 14.2898 5.95834"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
