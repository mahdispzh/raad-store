// navbar-landing.types.ts
import { ReactNode } from "react";
import { NotificationItem } from "../notifications-modal/notifications-modal.types";

export interface NavLink {
  key: string;
  label: string;
  href: string;
  icon: ReactNode;
}


export interface CartModalProductItem {
  id: string | number;
  title: string;
  imageSrc: string;
  color: string;
  colorHex: string;
  size: string;
  price: number;
  discount?: number;
  quantity: number;
}

export interface CartLogicReturn {
  isOpen: boolean;
  items: CartModalProductItem[];
  isLoading: boolean;
  error: Error | null;
  itemsCount: number;
  open: () => void;
  close: () => void;
  handleBagIconClick: () => void;
  handleIncrease: (id: string | number) => Promise<void>;
  handleDecrease: (id: string | number) => Promise<void>;
  handleRemove: (id: string | number) => Promise<void>;
  handleCheckout: () => void;
}

export interface NotificationsLogicReturn {
  isOpen: boolean;
  notifications: NotificationItem[];
  unreadCount: number;
  open: () => void;
  close: () => void;
  onRemove: (id: string) => void;
  onViewAll: () => void;
}

export interface ProfileMenuLogicReturn {
  isCategoriesOpen: boolean;
  isProfileMenuOpen: boolean;
  isLogoutModalOpen: boolean;
  openCategories: () => void;
  closeCategories: () => void;
  openProfileMenu: () => void;
  closeProfileMenu: () => void;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
  handleLogoutConfirm: () => Promise<void>;
  handleLogoutClick: () => void;
}

export interface UseNavbarLogicReturn {
  isLoggedIn: boolean;
  isLoading: boolean;
  activeLink: string;
  isSearchOpen: boolean;
  handleActiveLink: (link: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  cart: CartLogicReturn;
  notifications: NotificationsLogicReturn;
  profile: ProfileMenuLogicReturn;
}
