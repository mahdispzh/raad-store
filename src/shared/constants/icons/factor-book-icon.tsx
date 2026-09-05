import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function FactorBookIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 18 22"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M0.770508 4.5652V17.9184C0.770508 19.6204 2.15015 21 3.85202 21H14.1237C15.8257 21 17.2053 19.6204 17.2053 17.9184V7.64671C17.2053 5.94484 15.8257 4.5652 14.1237 4.5652H0.770508ZM0.770508 4.5652V3.53802"
        stroke="currentColor"
        strokeWidth="1.54076"
      />
      <path
        d="M13.8677 4.30859V4.82227H2.38428V4.30859H13.8677ZM1.20264 3.97852C1.24735 4.03664 1.2998 4.08809 1.35791 4.13281V4.7207C1.02145 4.58306 0.752394 4.31497 0.614746 3.97852H1.20264ZM1.26807 2.87793C1.24561 2.901 1.22525 2.92569 1.20557 2.95117H0.615723C0.728407 2.67623 0.928769 2.44529 1.18506 2.29492L1.26807 2.87793ZM12.3335 1.11816L2.25928 2.55664L2.18701 2.04883L12.2612 0.609375L12.3335 1.11816ZM13.2856 0.520508C14.2873 0.600907 15.1294 1.33152 15.3511 2.31152H14.8179C14.6197 1.64525 14.0486 1.15034 13.3608 1.04883L13.2856 0.520508Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.02717"
      />
      <path
        d="M4.87939 10.7283H13.0968"
        stroke="currentColor"
        strokeWidth="1.54076"
        strokeLinecap="round"
      />
      <path
        d="M4.87939 14.3234H10.5288"
        stroke="currentColor"
        strokeWidth="1.54076"
        strokeLinecap="round"
      />
    </svg>
  );
}
