"use client";

import { Text } from "../../ui";
import { useBlogStatusBadge } from "./useBlogStatusBadge";
import type { BlogStatusBadgeProps } from "./blog-status-badge.types";

export function BlogStatusBadge({ status }: BlogStatusBadgeProps) {
  const { label, Icon, textColorClass, borderColorClass } =
    useBlogStatusBadge(status);

  return (
    <span
      className={`
      w-30
        inline-flex
        items-center
        justify-center
        gap-1
        rounded-full
        border
        px-2
        py-1
        ${borderColorClass}
      `}
    >
      <Icon size="xs" color={textColorClass} />

      <span className={textColorClass}>
        <Text text={label} size="sm" weight="regular" />
      </span>
    </span>
  );
}
