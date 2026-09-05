import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ArrowDownwardIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 13 14"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.590909"
        y1="13.0009"
        x2="12.4091"
        y2="13.0009"
        stroke="currentColor"
        strokeWidth="1.18182"
        strokeLinecap="round"
      />
      <path
        d="M1.75055 0.995944C1.52735 0.757859 1.53941 0.383911 1.77749 0.160707C2.01558 -0.0624975 2.38953 -0.0504346 2.61273 0.18765L2.18164 0.591797L1.75055 0.995944ZM11.6359 10.0654C11.6254 10.3916 11.3524 10.6475 11.0262 10.6369L5.71081 10.4655C5.38463 10.455 5.12874 10.182 5.13926 9.85583C5.14978 9.52965 5.42273 9.27375 5.74891 9.28428L10.4737 9.43669L10.6261 4.71187C10.6367 4.38569 10.9096 4.1298 11.2358 4.14032C11.562 4.15085 11.8179 4.4238 11.8073 4.74998L11.6359 10.0654ZM2.18164 0.591797L2.61273 0.18765L11.4764 9.6422L11.0453 10.0463L10.6142 10.4505L1.75055 0.995944L2.18164 0.591797Z"
        fill="currentColor"
      />
    </svg>
  );
}