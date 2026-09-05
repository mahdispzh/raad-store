import { COMMENT_STATUS_MAP } from "./comment-status-badge.constants";
import type { CommentStatus } from "./comment-status-badge.types";

export function useCommentStatusBadge(status: CommentStatus) {
  const config = COMMENT_STATUS_MAP[status];

  return {
    label: config.label,
    Icon: config.Icon,
    textColorClass: config.textColorClass,
    borderColorClass: config.borderColorClass,
  };
}
