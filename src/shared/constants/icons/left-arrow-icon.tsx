import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function LeftArrowIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 27 19"
      fill="none"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
    >
      <path
        d="M25.25 10.455C25.9404 10.455 26.5 9.89531 26.5 9.20495C26.5 8.5146 25.9404 7.95495 25.25 7.95495V9.20495V10.455ZM0.366116 8.32107C-0.122038 8.80922 -0.122038 9.60068 0.366116 10.0888L8.32107 18.0438C8.80922 18.5319 9.60068 18.5319 10.0888 18.0438C10.577 17.5556 10.577 16.7642 10.0888 16.276L3.01777 9.20495L10.0888 2.13388C10.577 1.64573 10.577 0.854273 10.0888 0.366117C9.60068 -0.122038 8.80922 -0.122038 8.32107 0.366117L0.366116 8.32107ZM25.25 9.20495V7.95495L1.25 7.95495V9.20495V10.455L25.25 10.455V9.20495Z"
        fill="currentColor"
      />
    </svg>
  );
}
