// profile-modal.types.ts
export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement | null> | undefined;
  userName?: string;
  onLogout?: () => void; // اضافه کردن
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  iconKey: keyof typeof ICONS;
  isDanger?: boolean;
  onClick?: () => void; // اضافه کردن برای کلیک
}

export const ICONS = {
  Bag: "Bag",
  Location: "Location",
  LikeIcon: "LikeIcon",
  Comment: "Comment",
  Logout: "Logout",
} as const;

export type IconKeys = keyof typeof ICONS;

export interface User {
  id: number;
  name: string | null;
  mail: string | null;
  phone: string | null;
}