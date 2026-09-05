import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { getNotificationContent } from "@/src/shared/notifications/notification-content";
import { useAuthStore } from "@/src/shared/store/store";

import type { CurrentUser, NotificationItem } from "./topbar.types";

// ===== User =====

export async function fetchCurrentUser(): Promise<CurrentUser | null> {
  const userId = useAuthStore.getState().user?.id;
  if (!userId) return null;

  try {
    const data = await fetcher<{
      id: number;
      name: string | null;
      mail: string | null;
      phone: string | null;
      role?: number;
      image_id: number | null;
    }>(() => apiClient.get(`protected/users/${userId}`));

    return {
      id: data.id,
      name: data.name || null,
      mail: data.mail || null,
      phone: data.phone || null,
      role: data.role || 1,
      image_id: data.image_id,
    };
  } catch (error) {
    console.error("Error fetching user:", error);

    const localUser = useAuthStore.getState().user;
    if (localUser) {
      return {
        id: localUser.id,
        name: localUser.name || null,
        mail: localUser.mail || null,
        phone: localUser.phone || null,
        role: localUser.role,
        image_id: localUser.image_id ?? null,
      };
    }

    return null;
  }
}

// ===== Notifications =====

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

export async function fetchNotifications(): Promise<NotificationItem[]> {
  const token = useAuthStore.getState().accessToken;
  if (!token) return [];

  try {
    const data = await fetcher<ApiNotification[]>(() =>
      apiClient.get("protected/notifications?limit=20"),
    );

    return data.map((notification) => ({
      id: String(notification.id),
      ...getNotificationContent(notification.type, notification.data),
      time: formatTime(notification.created_at),
      isRead: notification.is_read,
    }));
  } catch (error) {
    console.error("خطا در دریافت اعلان‌ها:", error);
    return [];
  }
}

export async function removeNotificationApi(id: string): Promise<void> {
  await fetcher(() => apiClient.delete(`protected/notifications/${id}`));
}

export async function markAllNotificationsReadApi(): Promise<void> {
  await fetcher(() => apiClient.patch("protected/notifications"));
}
