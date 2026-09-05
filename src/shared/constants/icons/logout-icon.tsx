import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function LogoutIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 21 22"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M6.75195 5.75C6.76406 3.57497 6.86051 2.39706 7.62889 1.62868C8.5076 0.75 9.9218 0.75 12.7502 0.75H13.7502C16.5786 0.75 17.9929 0.75 18.8715 1.62868C19.7502 2.50736 19.7502 3.92157 19.7502 6.75V14.75C19.7502 17.5784 19.7502 18.9926 18.8715 19.8713C17.9929 20.75 16.5786 20.75 13.7502 20.75H12.7502C9.9218 20.75 8.5076 20.75 7.62889 19.8713C6.86051 19.1029 6.76406 17.925 6.75195 15.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11.25 10.75H0.75M0.75 10.75L4.25 7.75M0.75 10.75L4.25 13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
