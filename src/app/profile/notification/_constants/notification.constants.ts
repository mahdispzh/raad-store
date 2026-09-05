import { CheckIcon, CircularCommentIcon, CommentIcon, LikeIcon, TruckIcon } from "@/src/shared/constants/icons";
import { CategoryType } from "../_types/notifications-modal.types";

// تایپ icon رو مستقیم از خود کامپوننت می‌گیریم تا با پراپ‌های
// واقعی آیکن‌ها (مثل size: "xs" | "sm" | ...) همیشه هماهنگ بمونه
type IconComponent = typeof CheckIcon;

export interface CategoryConfig {
  icon: IconComponent;
  iconColor: string;
  bg: string;
}

// از switch اکسسیو استفاده شده به‌جای ایندکس مستقیم روی Record
// چون با noUncheckedIndexedAccess، ایندکس روی Record تایپش
// `T | undefined` می‌شه حتی اگه همه‌ی کیس‌ها پوشش داده شده باشن.
export function getCategoryConfig(category: CategoryType): CategoryConfig {
  switch (category) {
    case "favorite":
      return { icon: LikeIcon, iconColor: "text-white", bg: "bg-danger" };
    case "order":
      return { icon: CheckIcon, iconColor: "text-green-500", bg: "bg-success" };
    case "delivery":
      return { icon: TruckIcon, iconColor: "text-gray-500", bg: "bg-primary" };
    case "comment":
      return { icon: CircularCommentIcon, iconColor: "text-red-500", bg: "bg-secondary" };
  }
}