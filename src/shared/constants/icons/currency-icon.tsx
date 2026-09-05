import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function CurrencyIcon({
  size = "lg",
  color = "text-secondary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 7 14"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.42529 0.799988V2.29999M3.42529 2.29999C4.92529 2.29999 5.80029 2.79999 6.05029 3.79999M3.42529 2.29999C1.17529 2.29999 0.800293 3.76738 0.800293 4.54999C0.800293 7.65523 6.05029 6.02369 6.05029 9.04999C6.05029 9.8326 5.67529 11.3 3.42529 11.3M3.42529 11.3V12.8M3.42529 11.3C1.92529 11.3 1.05029 10.8 0.800293 9.79999"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}