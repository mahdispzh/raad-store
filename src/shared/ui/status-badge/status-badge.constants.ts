import type {
  StatusBadgeColor,
  StatusBadgeType,
} from "./status-badge.types";

export const STATUS_BADGE_COLORS = {
  success: { bg: "bg-success/15", dot: "bg-success" },
  danger: { bg: "bg-danger/15", dot: "bg-danger" },
  warning: { bg: "bg-warning/15", dot: "bg-warning" },
  gray: { bg: "bg-gray/20", dot: "bg-gray" },
} as const satisfies Record<
  StatusBadgeColor,
  {
    bg: string;
    dot: string;
  }
>;

export const DEFAULT_STATUS_BADGE_SIZE = "sm" as const;

export const DEFAULT_STATUS_BADGE_TYPE: StatusBadgeType = "dot";

export const STATUS_BADGE_SIZES = ["sm", "md"] as const;