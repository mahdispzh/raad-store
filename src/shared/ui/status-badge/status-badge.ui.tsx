"use client";

import { Text } from "@/src/shared/ui";

import type { StatusBadgeProps } from "./status-badge.types";
import {
  DEFAULT_STATUS_BADGE_SIZE,
  DEFAULT_STATUS_BADGE_TYPE,
} from "./status-badge.constants";
import { useStatusBadgeStyles } from "./useStatusBadge";

export function StatusBadge({
  text,
  color,
  size = DEFAULT_STATUS_BADGE_SIZE,
  type = DEFAULT_STATUS_BADGE_TYPE,
  icon,
  className,
}: StatusBadgeProps) {
  const styles = useStatusBadgeStyles(color);

  return (
    <span
      className={[
        "inline-flex w-fit items-center justify-center gap-1.5 rounded-md px-3 py-1",
        styles.bg,
        className ?? "",
      ].join(" ")}
    >
      {type === "dot" ? (
        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      ) : (
        icon
      )}

      <Text
        text={text}
        size={size}
        weight="regular"
      />
    </span>
  );
}