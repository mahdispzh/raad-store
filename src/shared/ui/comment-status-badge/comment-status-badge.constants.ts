import { ClockIcon, CheckIcon, CloseIcon } from "../../constants/icons";
import { CommentStatus, CommentStatusConfig } from "./comment-status-badge.types";

// اسم آیکون‌ها رو با اسم واقعی export شده‌شون تو فایل constants/icons چک کن،
// اگه فرق داره فقط همین importها رو اصلاح کن، بقیه فایل‌ها دست‌نخورده می‌مونن.
export const COMMENT_STATUS_MAP: Record<CommentStatus, CommentStatusConfig> = {
  0: {
    label: "در انتظار تأیید",
    Icon: ClockIcon,
    textColorClass: "text-primary",
    borderColorClass: "border-primary",
  },
  1: {
    label: "تأیید شده",
    Icon: CheckIcon,
    textColorClass: "text-primary",
    borderColorClass: "border-primary",
  },
  2: {
    label: "رد شده",
    Icon: CloseIcon,
    textColorClass: "text-primary",
    borderColorClass: "border-primary",
  },
};
