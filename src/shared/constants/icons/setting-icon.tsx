import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function SettingIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 18 20"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.599609 6.96968V12.2204C0.599609 14.1497 0.599609 14.1497 2.37739 15.3782L7.26628 18.272C8.00405 18.7088 9.20405 18.7088 9.93294 18.272L14.8218 15.3782C16.5996 14.1497 16.5996 14.1497 16.5996 12.2295V6.96968C16.5996 5.04956 16.5996 5.04956 14.8218 3.82105L9.93294 0.927213C9.20405 0.490408 8.00405 0.490408 7.26628 0.927213L2.37739 3.82105C0.599609 5.04956 0.599609 5.04956 0.599609 6.96968Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.60026 12.3312C10.0731 12.3312 11.2669 11.1089 11.2669 9.60113C11.2669 8.09333 10.0731 6.87109 8.60026 6.87109C7.12746 6.87109 5.93359 8.09333 5.93359 9.60113C5.93359 11.1089 7.12746 12.3312 8.60026 12.3312Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}