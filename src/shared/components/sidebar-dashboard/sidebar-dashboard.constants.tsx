import {
  CartIcon,
  CategoryIcon,
  ContentIcon,
  ExitIcon,
  PackageIcon,
  SettingIcon,
  ShopIcon,
  UserIcon,
  UserProfileIcon,
} from "../../constants/icons";

import type { SidebarItem } from "./sidebar-dashboard.type";

export const SidebarDashboard: SidebarItem[] = [
  {
    id: "dashboard",
    title: "میزکار",
    icon: CategoryIcon,
    href: "/dashboard/home",
  },
  {
    id: "shop",
    title: "فروشگاه",
    icon: ShopIcon,
    items: [
      {
        id: "products",
        title: "محصولات",
        badge: 40,
        items: [
          {
            id: "products-overview",
            title: "نمای کلی",
            href: "/dashboard/products",
          },
          {
            id: "products-list",
            title: "لیست محصولات",
            href: "/dashboard/products/list",
          },
          {
            id: "products-create",
            title: "ایجاد محصول",
            href: "/dashboard/products/create",
          },
        ],
      },
      {
        id: "categories",
        title: "دسته‌بندی‌ها",
        items: [
            {
            id: "categories-list",
            title: "نمای کلی",
            href: "/dashboard/categories",
          },
          {
            id: "categories-list",
            title: "لیست دسته‌بندی‌ها",
            href: "/dashboard/categories/list",
          },
          {
            id: "categories-create",
            title: "ایجاد دسته‌بندی",
            href: "/dashboard/categories/create",
          },
        ],
      },
      {
        id: "brands",
        title: "برندها",
        items: [
          {
            id: "brands-list",
            title: "لیست برندها",
            href: "/dashboard/brands/list",
          },
          {
            id: "brands-create",
            title: "ایجاد برند",
            href: "/dashboard/brands/create",
          },
        ],
      },
      {
        id: "colors",
        title: "رنگ‌ها",
        items: [
          {
            id: "colors-list",
            title: "لیست رنگ‌ها",
            href: "/dashboard/colors/list",
          },
          {
            id: "colors-create",
            title: "ایجاد رنگ",
            href: "/dashboard/colors/create",
          },
        ],
      },
      {
        id: "sizes",
        title: "سایزها",
        items: [
          {
            id: "sizes-list",
            title: "لیست سایزها",
            href: "/dashboard/sizes/list",
          },
          {
            id: "sizes-create",
            title: "ایجاد سایز",
            href: "/dashboard/sizes/create",
          },
        ],
      },
    ],
  },
  {
    id: "orders-sales",
    title: "سفارشات و فروش",
    icon: PackageIcon,
    items: [
      {
        id: "orders",
        title: "سفارشات",
        badge: 12,
        items: [
          {
            id: "orders-overview",
            title: "نمای کلی",
            href: "/dashboard/orders/overview",
          },
          {
            id: "orders-list",
            title: "لیست سفارش‌ها",
            href: "/dashboard/orders/list",
          },
        ],
      },
      {
        id: "payments",
        title: "پرداخت‌ها",
        items: [
          {
            id: "payments-overview",
            title: "نمای کلی",
            href: "/dashboard/payments",
          },
          {
            id: "payments-list",
            title: "لیست پرداخت‌ها",
            href: "/dashboard/payments/list",
          },
        ],
      },
      {
        id: "discounts",
        title: "کدهای تخفیف",
        href: "/dashboard/discount-codes",
      },
    ],
  },
  {
    id: "content",
    title: "محتوا",
    icon: ContentIcon,
    items: [
      {
        id: "blogs",
        title: "بلاگ‌ها",
        badge: 5,
        items: [
          { id: "blogs-overview", title: "نمای کلی", href: "/dashboard/blogs" },
          {
            id: "blogs-list",
            title: "لیست بلاگ‌ها",
            href: "/dashboard/blogs/list",
          },
          {
            id: "blogs-create",
            title: "افزودن بلاگ",
            href: "/dashboard/blogs/create",
          },
        ],
      },
      {
        id: "tutorials",
        title: "آموزش",
        href: "/dashboard/tutorials",
      },
      {
        id: "banners",
        title: "بنرها",
        items: [
          {
            id: "banners-list",
            title: "لیست بنرها",
            href: "/dashboard/banners/list",
          },
          {
            id: "banners-create",
            title: "افزودن بنر",
            href: "/dashboard/banners/create",
          },
        ],
      },
    ],
  },
  {
    id: "users",
    title: "کاربران",
    icon: UserIcon,
    items: [
      {
        id: "users-list",
        title: "کاربران",
        items: [
          { id: "users-overview", title: "نمای کلی", href: "/dashboard/users" },
          {
            id: "users-all-list",
            title: "لیست کاربران",
            href: "/dashboard/users/list",
          },
        ],
      },
      {
        id: "comments",
        title: "کامنت‌ها",
        badge: 8,
        items: [
          {
            id: "comments-overview",
            title: "نمای کلی",
            href: "/dashboard/comments/overview",
          },
          {
            id: "comments-list",
            title: "لیست کامنت‌ها",
            href: "/dashboard/comments/list",
          },
        ],
      },
    ],
  },
  {
    id: "settings",
    title: "تنظیمات",
    icon: SettingIcon,
    items: [
      {
        id: "account-info",
        title: "حساب کاربری",
        href: "/dashboard/profile",
      },
      {
        id: "store-info",
        title: "اطلاعات فروشگاهی",
        href: "/dashboard/store-information",
      },
    ],
  },
];

export const SIDEBAR_BOTTOM_ACTIONS: SidebarItem[] = [
  {
    id: "go-to-shop",
    title: "انتقال به فروشگاه",
    icon: CartIcon,
    href: "/",
  },
  {
    id: "profile",
    title: "انتقال به صفحه پروفایل",
    icon: UserProfileIcon,
    href: "/profile/home",
  },
  {
    id: "logout",
    title: "خروج از حساب کاربری",
    icon: ExitIcon,
    href: "/logout",
  },
];
