import { BLOG_STATUS_MAP } from "./blog-status-badge.constants";
import type { BlogStatus } from "./blog-status-badge.types";

export function useBlogStatusBadge(status: BlogStatus) {
  const config = BLOG_STATUS_MAP[status];

  return {
    label: config.label,
    Icon: config.Icon,
    textColorClass: config.textColorClass,
    borderColorClass: config.borderColorClass,
  };
}
