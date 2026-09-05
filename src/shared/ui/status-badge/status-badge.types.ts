import type { ReactNode } from "react";

export type StatusBadgeColor = "success" | "danger" | "warning" | "gray";

export type StatusBadgeType = "dot" | "icon";

export interface StatusBadgeProps {
  /** متنی که داخل بج نمایش داده میشه */
  text: string;

  /** رنگ بج */
  color: StatusBadgeColor;

  /** اندازه متن */
  size?: "sm" | "md";

  /** نوع نمایش کنار متن */
  type?: StatusBadgeType;

  /** آیکون (در صورت type="icon") */
  icon?: ReactNode;

  /** کلاس‌های اضافه */
  className?: string;
}