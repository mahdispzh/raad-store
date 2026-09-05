import { useEffect, useState } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

import {
  fetchCurrentUser,
  fetchNotifications,
  markAllNotificationsReadApi,
  removeNotificationApi,
} from "./topbar.api";
import { PERSIAN_DIGITS, PERSIAN_MONTHS } from "./topbar.constants";
import type { CurrentUser, NotificationItem } from "./topbar.types";

dayjs.extend(jalaliday);

function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

function getTodayJalali(): string {
  const jDate = dayjs().calendar("jalali");
  const day = toPersianDigits(jDate.format("DD"));
  const monthIndex = Number(jDate.format("M")) - 1;
  const monthName = PERSIAN_MONTHS[monthIndex] ?? "";
  const year = toPersianDigits(jDate.format("YYYY"));

  return `${day} ${monthName} ${year}`;
}

export function useTopBar() {
  // ===== User =====
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setUserLoading(true);
      const result = await fetchCurrentUser();
      setUser(result);
      setUserLoading(false);
    };

    load();
  }, []);

  // ===== Notifications =====
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const loadNotifications = async () => {
    const result = await fetchNotifications();
    setNotifications(result);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadNotifications();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const openNotif = () => {
    setIsNotifOpen(true);
    void loadNotifications();
  };

  const closeNotif = () => setIsNotifOpen(false);

  const removeNotif = async (id: string) => {
    try {
      await removeNotificationApi(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("خطا در حذف اعلان:", error);
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsReadApi();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("خطا در علامت‌گذاری اعلان‌ها:", error);
    }
  };

  useEffect(() => {
    if (isNotifOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isNotifOpen]);

  // ===== Date =====
  const today = getTodayJalali();

  return {
    user,
    userLoading,
    today,
    notifications,
    unreadCount,
    isNotifOpen,
    openNotif,
    closeNotif,
    removeNotif,
    markAllRead,
  };
}