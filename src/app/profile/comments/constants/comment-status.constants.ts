// src/app/profile/comments/constants/comment-status.constants.ts
import type { StatusBadgeColor } from "@/src/shared/ui/status-badge/status-badge.types";

export const COMMENT_STATUS_MAP: Record<number, { text: string; color: StatusBadgeColor }> = {
  0: { text: "در انتظار تایید", color: "warning" },
  1: { text: "تایید شده", color: "success" },
  2: { text: "تایید نشده", color: "danger" },
} as const;