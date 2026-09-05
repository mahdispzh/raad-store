"use client";

import { Text } from "@/src/shared/ui";
import { NotificationItem } from "../_types/notifications-modal.types";
import { getCategoryConfig } from "../_constants/notification.constants";

export function NotificationListItem({
  category,
  text,
  time,
  extraData,
  isRead,
}: NotificationItem) {
  const { icon: Icon, iconColor, bg } = getCategoryConfig(category);

  return (
    <div
      className={`flex flex-col gap-2 rounded-xs border-gray border-2 p-4 transition-colors `}
    >
      <div className="flex flex-row items-start justify-between gap-3">
       
        <div className="flex flex-1 flex-row items-start justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
           <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} ${iconColor}`}
          >
            <Icon size="md" color="text-white" />
          </div>
            <Text text={text} size="md" weight="bold" />
              {!isRead && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-danger" />
            )}
          </div>

          <Text text={time} color="gray" weight="medium" size="md" />
        </div>
      </div>
                <Text text={extraData} size="md" weight="regular" color="secondary" />

    </div>
  );
}