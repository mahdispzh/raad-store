"use client";

import { EmptyState } from "@/src/shared/components/empty-states/profile-empty-states";
import { ProfileContainer } from "@/src/shared/components/profile-container";
import { ProfileMain } from "@/src/shared/components/profile-main";
import { DoubleCheckIcon } from "@/src/shared/constants/icons";
import { getNotificationContent } from "@/src/shared/notifications/notification-content";
import { useAuthStore } from "@/src/shared/store/store";
import { Text } from "@/src/shared/ui";
import { useCallback, useEffect, useState } from "react";
import type { NotificationItem } from "../_types/notifications-modal.types";
import { NotificationListItem } from "./notification-list-item";

type ApiNotification = {
  id: number;
  type: string;
  data: Record<string, string | number | boolean | null> | null;
  is_read: boolean;
  created_at: string;
};

function formatTime(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const getHeaders = useCallback(() => {
    const token = useAuthStore.getState().accessToken;
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  }, []);

  const loadNotifications = useCallback(async () => {
    const headers = getHeaders();
    if (!headers) return;

    const response = await fetch("/api/protected/notifications?limit=100", {
      headers,
    });
    if (!response.ok) return;

    const data: ApiNotification[] = await response.json();
    setNotifications(
      data.map((notification) => ({
        id: String(notification.id),
        ...getNotificationContent(notification.type, notification.data),
        time: formatTime(notification.created_at),
        isRead: notification.is_read,
      })),
    );
  }, [getHeaders]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadNotifications();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadNotifications]);

  const handleMarkAllRead = async () => {
    const headers = getHeaders();
    const response = await fetch("/api/protected/notifications", {
      method: "PATCH",
      ...(headers ? { headers } : {}),
    });
    if (response.ok) {
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, isRead: true })),
      );
    }
  };

  const hasUnread = notifications.some((notification) => !notification.isRead);
  if (notifications.length === 0) {
    return (
      <EmptyState
        label="هنوز پیامی دریافت نکرده‌اید."
        text="جدیدترین پیشنهادها، تخفیف‌ها و وضعیت سفارشات را اینجا نمایش می‌دهیم."
      />
    );
  }

  return (
    <ProfileContainer>
      <ProfileMain>
        <div className="flex flex-row justify-end">
          {hasUnread && (
            <button
              onClick={handleMarkAllRead}
              className="flex cursor-pointer flex-row gap-1 text-gray-600"
            >
              <DoubleCheckIcon size="md" color="text-primary" />
              <Text text="خواندن همه اعلان‌ها" size="md" weight="medium" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {notifications.map((item) => (
            <NotificationListItem key={item.id} {...item} />
          ))}
        </div>
      </ProfileMain>
    </ProfileContainer>
  );
}
