import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function SaveFilledIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 18 24"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M16.8569 5.10128V20.6048C16.8569 22.5837 15.6684 23.4162 14.2169 22.4609L9.72552 19.4721C9.24552 19.1582 8.46835 19.1582 7.98835 19.4721L3.49693 22.4609C2.04551 23.4162 0.856934 22.5837 0.856934 20.6048V5.10128C0.856934 2.76756 2.45692 0.856934 4.41121 0.856934H13.3026C15.2569 0.856934 16.8569 2.76756 16.8569 5.10128Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
