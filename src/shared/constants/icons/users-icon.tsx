// constants/icons/user-icon.tsx
import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function UsersIcon({ size = "lg", color = "text-secondary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M8.52687 9C10.7862 9 12.6177 7.20914 12.6177 5C12.6177 2.79086 10.7862 1 8.52687 1C6.26757 1 4.43604 2.79086 4.43604 5C4.43604 7.20914 6.26757 9 8.52687 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.00049 16.9999C1.46716 15.4265 2.43061 14.0376 3.75313 13.0318C5.07564 12.0261 6.68952 11.4549 8.36402 11.3999C11.7349 11.3999 14.6067 13.7279 15.7276 16.9999"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7624 2.95215C15.3856 3.26457 15.8899 3.76424 16.2011 4.37774C16.5124 4.99123 16.6141 5.68612 16.4914 6.36036C16.3687 7.03458 16.028 7.6525 15.5194 8.12338C15.0109 8.59418 14.3612 8.89306 13.666 8.9761"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.353 11.0562C15.4445 11.3281 16.4456 11.8707 17.2597 12.6318C18.0738 13.3927 18.6733 14.3462 19.0002 15.4001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}