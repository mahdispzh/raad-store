import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ArrowUpwardIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 13 14"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.590909"
        y1="12.9989"
        x2="12.4091"
        y2="12.9989"
        stroke="currentColor"
        strokeWidth="1.18182"
        strokeLinecap="round"
      />
      <path
        d="M1.75055 9.64077C1.52735 9.87886 1.53941 10.2528 1.77749 10.476C2.01558 10.6992 2.38953 10.6872 2.61273 10.4491L2.18164 10.0449L1.75055 9.64077ZM11.6359 0.571324C11.6254 0.245144 11.3524 -0.0107482 11.0262 -0.000226217L5.71081 0.171239C5.38463 0.181761 5.12874 0.454712 5.13926 0.780893C5.14978 1.10707 5.42273 1.36296 5.74891 1.35244L10.4737 1.20003L10.6261 5.92484C10.6367 6.25102 10.9096 6.50692 11.2358 6.49639C11.562 6.48587 11.8179 6.21292 11.8073 5.88674L11.6359 0.571324ZM2.18164 10.0449L2.61273 10.4491L11.4764 0.994523L11.0453 0.590376L10.6142 0.186229L1.75055 9.64077L2.18164 10.0449Z"
        fill="currentColor"
      />
    </svg>
  );
}