import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function HomeIcon({ size = "lg", color = "text-secondary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7927 13.248H9.58154V10.304H5.15929V13.248H2.94816V6.48636L7.36304 2.07773L11.7927 6.50033V13.248ZM13.2668 5.89096V5.888L7.37189 0L0 7.35412L1.03996 8.39482L1.47409 7.95836V14.72H6.63338V11.776H8.10747V14.72H13.2668V14.7178V7.97233L13.6979 8.40219L14.7416 7.36148L13.2668 5.89096Z"
        fill="currentColor"
      />
    </svg>
  );
}
