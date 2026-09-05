// _types/dashboard-home._types.ts
export interface ActionCardProps {
  name?: string;
  msgText?: string;
  profileText?: string;
  logoutText?: string;
  onMsg?: () => void;
  onProfile?: () => void;
  onLogout?: () => void;
}

// satisfaction-card._types.ts
import { SatisfactionItem } from "@/src/shared/ui/satisfaction-chart/satisfaction-chart.types";

export interface SatisfactionCardProps {
  title?: string;
  total?: string;
  fromTotal?: string;
  fromTotalValue?: number;
  data: SatisfactionItem[];
  className?: string;
  chartPercentage?: number;
}

// status-card._types.ts
import { ReactNode } from "react";

export interface StatusItem {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface StatusCardProps {
  title?: string;
  items: StatusItem[];
  className?: string;
}

// inventory-card._types.ts
export interface InventoryItem {
  value: string;
  label: string;
}

export interface InventoryCardProps {
  title?: string;
  items: InventoryItem[];
  className?: string;
}

// inventory-card._types.ts
export interface InventoryItem {
  value: string;
  label: string;
  description?: string;
}

export interface InventoryCardProps {
  title?: string;
  items: InventoryItem[];
  className?: string;
}

// quick-card._types.ts
export interface QuickCardItem {
  id: number;
  label: string;
  value?: string;
  icon?: React.ReactNode;
  buttonIcon?: React.ReactNode;
  onClick?: () => void;
  isButton?: boolean;
}

export interface QuickCardProps {
  items: QuickCardItem[];
  className?: string;
}
