"use client";

import { Text } from "../../ui";
import { useCommentStatusBadge } from "./useCommentStatusBadge";
import type { CommentStatusBadgeProps } from "./comment-status-badge.types";

export function CommentStatusBadge({ status }: CommentStatusBadgeProps) {
  const { label, Icon, textColorClass, borderColorClass } =
    useCommentStatusBadge(status);

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
