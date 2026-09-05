import { ReactNode } from "react";

// _types/navbar-dashboard._types.ts
export interface DashboardNavLink {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}

export interface NavbarDashboardProps {}
