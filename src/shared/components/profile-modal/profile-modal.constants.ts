// profile-modal.constants.ts
import { IconKeys, MenuItem } from "./profile-modal.types";

import {
  BagIcon,
  CircularCommentIcon,
  ClockIcon,
  FactorIcon,
  LikeIcon,
  LocationPinIcon,
  LogoutIcon,
  ProductIcon,
  ReplyIcon,
  StoreIcon,
  UsersIcon,
  WalletIcon,
} from "../../constants/icons";

export const ICON_MAP: Record<IconKeys, React.ComponentType<any>> = {
  // آیکون‌های قبلی
  Bag: BagIcon,
  Location: LocationPinIcon,
  Comment: CircularCommentIcon,
  Logout: LogoutIcon,
  LikeIcon: LikeIcon,
  // آیکون‌های جدید ادمین
  Dashboard: StoreIcon,
  Product: ProductIcon,
  Invoice: FactorIcon,
  Payment: WalletIcon,
  Store: StoreIcon,
  Users: UsersIcon,
  Blog: StoreIcon,
  Replay: ReplyIcon,
  Clock: ClockIcon,
};

// آیتم‌های منوی کاربر عادی
export const MENU_ITEMS: Omit<MenuItem, "onClick">[] = [
  {
    id: "orders",
    label: "سفارش‌ها",
    href: "/profile/orders",
    iconKey: "Bag",
  },
  {
    id: "addresses",
    label: "آدرس‌ها",
    href: "/profile/addresses",
    iconKey: "Location",
  },
  {
    id: "whishlists",
    label: "علاقه‌مندی‌ها",
    href: "/profile/wishlist",
    iconKey: "LikeIcon",
  },
  {
    id: "reviews",
    label: "دیدگاه‌ها",
    href: "/profile/comments",
    iconKey: "Comment",
  },
];

// آیتم‌های منوی ادمین
export const ADMIN_MENU_ITEMS: Omit<MenuItem, "onClick">[] = [
  {
    id: "products",
    label: "محصولات",
    href: "/dashboard/products",
    iconKey: "Product",
  },
  {
    id: "invoices",
    label: "فاکتورها",
    href: "/dashboard/factors",
    iconKey: "Invoice",
  },
  {
    id: "payments",
    label: "پرداخت‌ها",
    href: "/dashboard/payments",
    iconKey: "Payment",
  },
];

// نکته: ADMIN_STATS ثابت حذف شد — این داده‌ها الان به‌صورت زنده
// از use-admin-stats.ts (که API واقعی رو صدا می‌زنه) میاد.

// آیتم خروج جداگانه
export const LOGOUT_ITEM: MenuItem = {
  id: "logout",
  label: "خروج از حساب کاربری",
  href: "#",
  iconKey: "Logout",
  isDanger: true,
};

export const MODAL_STYLES = {
  container: "fixed inset-0 z-50",
  modal: "absolute w-66 rounded-md border-2 border-gray-200 bg-white",
  header: "px-4 pt-4",
  headerContent: "flex items-start justify-between",
  divider: "mt-3 h-px bg-gray-200",
  menuItem:
    "flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer",
  menuItemDanger: "text-red-600 ",
  iconWrapper: "h-5 w-5 flex items-center justify-center",
  itemDivider: "px-10",
  itemDividerLine: "h-px bg-gray-200",
  statsContainer: "px-4 py-2",
  statsItem: "flex items-center justify-between px-5 py-2  transition-colors",
  statsValue: "rounded-full bg-gray-100 px-2 py-0.5 min-w-[24px] text-center",
} as const;