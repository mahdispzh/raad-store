import { TruckIcon } from "../../constants/icons";

// profile-modal.types.ts
export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement | null> | undefined;
  userName?: string;
  onLogout?: () => void;
  userRole?: number;
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  iconKey: keyof typeof ICONS;
  isDanger?: boolean;
  onClick?: () => void;
}

export const ICONS = {
  Bag: "Bag",
  Location: "Location",
  LikeIcon: "LikeIcon",
  Comment: "Comment",
  Logout: "Logout",
  Dashboard: "Dashboard",
  Product: "Product",
  Invoice: "Invoice",
  Payment: "Payment",
  Store: "Store",
  Users: "Users",
  Blog: "Blog",
  Replay: "Replay",
      Clock: "ClockIcon",
  
} as const;

export type IconKeys = keyof typeof ICONS;

export interface User {
  id: number;
  name: string | null;
  mail: string | null;
  phone: string | null;
  role?: number;
}

// ✅ اضافه کردن تایپ برای AdminStat
export interface AdminStat {
  id: number;
  label: string;
  value: number | string;
  percent?: string;
  iconPercent: String;
  iconKey: IconKeys;
}
