import {
  CheckIcon,
  ClockIcon,
  CloseIcon,
  EditPanelIcon,
} from "../../constants/icons";
import { BlogStatus, BlogStatusConfig } from "./blog-status-badge.types";

// اسم آیکون‌ها رو با اسم واقعی export شده‌شون تو فایل constants/icons چک کن،
// اگه فرق داره (مخصوصاً EditIcon برای پیش‌نویس) فقط همین importها رو اصلاح کن،
// بقیه فایل‌ها دست‌نخورده می‌مونن.
export const BLOG_STATUS_MAP: Record<BlogStatus, BlogStatusConfig> = {
  0: {
    label: "پیش‌نویس",
    Icon: EditPanelIcon,
    textColorClass: "text-primary",
    borderColorClass: "border-primary",
  },
  1: {
    label: "منتشر شده",
    Icon: CheckIcon,
    textColorClass: "text-primary",
    borderColorClass: "border-primary",
  },
  2: {
    label: "زمان‌بندی شده",
    Icon: ClockIcon,
    textColorClass: "text-primary",
    borderColorClass: "border-primary",
  },
  3: {
    label: "منتشر نشده",
    Icon: CloseIcon,
    textColorClass: "text-primary",
    borderColorClass: "border-primary",
  },
};
