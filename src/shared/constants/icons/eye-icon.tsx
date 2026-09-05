import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function EyeIcon({ size = "lg", color = "text-secondary" }: IconProps) {
  return (
    <>
      <svg
        viewBox="0 0 12 8"
        fill="none"
        className={`${ICON_SIZE_CLASS[size]} ${color}`}
      >
        <path
          d="M7.4165 3.9329C7.4165 4.74728 6.67499 5.40743 5.76024 5.40743C4.84555 5.40743 4.104 4.74728 4.104 3.9329C4.104 3.11852 4.84555 2.45837 5.76024 2.45837C6.67499 2.45837 7.4165 3.11852 7.4165 3.9329Z"
          stroke="currentColor"
          strokeWidth="0.983108"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.76022 0.491577C3.28787 0.491577 1.19505 1.93803 0.491455 3.93214C1.19504 5.92624 3.28787 7.3727 5.76022 7.3727C8.23254 7.3727 10.3254 5.92624 11.029 3.93214C10.3254 1.93804 8.23254 0.491577 5.76022 0.491577Z"
          stroke="currentColor"
          strokeWidth="0.983108"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
