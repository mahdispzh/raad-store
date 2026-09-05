import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function RightArrowCircledIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M19.5981 38.0981C29.8154 38.0981 38.0981 29.8154 38.0981 19.5981C38.0981 9.38085 29.8154 1.09811 19.5981 1.09811C9.38088 1.09811 1.09814 9.38085 1.09814 19.5981C1.09814 29.8154 9.38088 38.0981 19.5981 38.0981Z"
        stroke="currentColor"
        strokeWidth="2.19624"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.8481 19.5981H10.3481M28.8481 19.5981L21.4481 12.1981M28.8481 19.5981L21.4481 26.9981"
        stroke="currentColor"
        strokeWidth="2.19624"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
