import {
  CheckBoldIcon,
  CircularCommentIcon,
  LikeIcon,
  TruckIcon,
} from "../../constants/icons";

import type { NotificationCategory } from "./topbar.types";

export const categoryColors: Record<NotificationCategory, string> = {
  order: "bg-success",
  favorite: "bg-danger",
  comment: "bg-primary",
  delivery: "bg-secondary",
};

export const categoryIcons: Record<NotificationCategory, React.ReactNode> = {
  order: <CheckBoldIcon size="md" color="text-white" />,
  favorite: <LikeIcon size="md" color="text-white" />,
  comment: <CircularCommentIcon size="md" color="text-white" />,
  delivery: <TruckIcon size="md" color="text-white" />,
};

export const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const PERSIAN_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];