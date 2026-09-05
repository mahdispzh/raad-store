"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { getNotificationContent } from "@/src/shared/notifications/notification-content";
import { useAuthStore } from "@/src/shared/store/store";
import type { NotificationItem } from "../notifications-modal/notifications-modal.types";

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

export function useNotificationsLogic() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const loadNotifications = useCallback(async () => {
    // اگه کاربر لاگین نباشه، درخواستی زده نشه (مثل رفتار قبلی)
    const token = useAuthStore.getState().accessToken;
    if (!token) return;

    try {
      const data = await fetcher<ApiNotification[]>(() =>
        apiClient.get("protected/notifications?limit=20"),
      );

      setNotifications(
        data.map((notification) => ({
          id: String(notification.id),
          ...getNotificationContent(notification.type, notification.data),
          time: formatTime(notification.created_at),
          isRead: notification.is_read,
        })),
      );
    } catch (error) {
      console.error("خطا در دریافت اعلان‌ها:", error);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadNotifications();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadNotifications]);

  const open = () => {
    setIsOpen(true);
    void loadNotifications();
  };
  const close = () => setIsOpen(false);

  const onRemove = async (id: string) => {
    try {
      await fetcher(() => apiClient.delete(`protected/notifications/${id}`));
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("خطا در حذف اعلان:", error);
    }
  };

  const markAllRead = async () => {
    try {
      await fetcher(() => apiClient.patch("protected/notifications"));
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, isRead: true })),
      );
    } catch (error) {
      console.error("خطا در علامت‌گذاری اعلان‌ها:", error);
    }
  };

  const onViewAll = () => {
    close();
    router.push("/profile/notification");
  };

  return {
    isOpen,
    notifications,
    unreadCount: notifications.filter((notification) => !notification.isRead)
      .length,
    open,
    close,
    onRemove,
    markAllRead,
    onViewAll,
  };
}