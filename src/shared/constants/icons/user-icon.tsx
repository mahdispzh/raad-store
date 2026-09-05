import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function UserIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      width="17"
      height="21"
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M12.1005 5.0166C12.1005 7.22574 10.296 9.0166 8.07005 9.0166C5.84406 9.0166 4.03955 7.22574 4.03955 5.0166C4.03955 2.80746 5.84406 1.0166 8.07005 1.0166C10.296 1.0166 12.1005 2.80746 12.1005 5.0166Z"
        stroke="currentColor"
        strokeWidth="2.03333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.06997 12.0166C4.1745 12.0166 1.0166 15.1506 1.0166 19.0166H15.1233C15.1233 15.1506 11.9654 12.0166 8.06997 12.0166Z"
        stroke="currentColor"
        strokeWidth="2.03333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
