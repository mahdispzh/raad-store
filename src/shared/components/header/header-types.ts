import type { ReactNode } from "react";

export interface HeaderLink {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
}