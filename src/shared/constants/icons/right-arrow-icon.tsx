import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function RightArrowIcon({
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
        d="M1.25 7.95495C0.559644 7.95495 0 8.5146 0 9.20495C0 9.89531 0.559644 10.455 1.25 10.455V9.20495V7.95495ZM26.1339 10.0888C26.622 9.60068 26.622 8.80922 26.1339 8.32107L18.1789 0.366117C17.6908 -0.122038 16.8993 -0.122038 16.4112 0.366117C15.923 0.854273 15.923 1.64573 16.4112 2.13388L23.4822 9.20495L16.4112 16.276C15.923 16.7642 15.923 17.5556 16.4112 18.0438C16.8993 18.5319 17.6908 18.5319 18.1789 18.0438L26.1339 10.0888ZM1.25 9.20495V10.455H25.25V9.20495V7.95495H1.25V9.20495Z"
        fill="currentColor"
      />
    </svg>
  );
}
