import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";

export type IconSize = keyof typeof ICON_SIZE_CLASS;

export interface IconProps {
  size?: IconSize;
  color?: string;
}
