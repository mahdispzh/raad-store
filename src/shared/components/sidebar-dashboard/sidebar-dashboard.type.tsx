import type { ComponentType } from "react";

export interface SidebarIconProps {
  size?: "xs" | "sm" | "md" | "lg";
  color?: string;
}

export interface SidebarItem {
  id: string;
  title: string;
  icon?: ComponentType<SidebarIconProps>;
  href?: string;
  badge?: number;
  items?: SidebarItem[];
}

export interface SidebarProps {
  pathname?: string;
}
