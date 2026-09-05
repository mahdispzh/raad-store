import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function InventoryIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 17 16"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 0H0V5.05263H0.85V14.3158C0.85 15.2463 1.61075 16 2.55 16H14.45C15.3893 16 16.15 15.2463 16.15 14.3158V5.05263H17V0ZM1.7 1.68421H15.3V3.36842H1.7V1.68421ZM14.45 14.3158H2.55V5.05263H14.45V14.3158ZM5.95 6.73684H11.05C11.05 7.66737 10.2893 8.42105 9.35 8.42105H7.65C6.71075 8.42105 5.95 7.66737 5.95 6.73684Z"
        fill="currentColor"
      />
    </svg>
  );
}