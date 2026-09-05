import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function PayIcon({ size = "lg", color = "text-secondary" }: IconProps) {
  return (
    <svg
      viewBox="0 0 17 14"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M0.600098 6.59998C0.600098 3.77155 0.600098 2.35734 1.47878 1.47865C2.35746 0.599975 3.77167 0.599976 6.6001 0.599976H9.6001C12.4285 0.599976 13.8428 0.599975 14.7214 1.47865C15.6001 2.35734 15.6001 3.77155 15.6001 6.59998C15.6001 9.42838 15.6001 10.8427 14.7214 11.7213C13.8428 12.6 12.4285 12.6 9.6001 12.6H6.6001C3.77167 12.6 2.35746 12.6 1.47878 11.7213C0.600098 10.8427 0.600098 9.42838 0.600098 6.59998Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        opacity="0.5"
        d="M6.6001 9.6001H3.6001"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        opacity="0.5"
        d="M9.6001 9.6001H8.4751"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        opacity="0.5"
        d="M0.600098 5.10004H15.6001"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
