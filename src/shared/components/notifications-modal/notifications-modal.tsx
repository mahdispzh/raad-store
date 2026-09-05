"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseModalIcon } from "../../constants/icons/close-modal-icon";
import { DualSquareEmpty } from "../../constants/icons/dual-square-empty";
import { DefaultButton, Text } from "../../ui";
import { NotificationItem } from "./notification-item";
import { NotificationsDrawerProps } from "./notifications-modal.types";

export function NotificationsDrawer({
  isOpen,
  onClose,
  notifications,
  onViewAll,
  onRemove,
  onMarkAllRead,
}: NotificationsDrawerProps) {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  // ✅ قفل اسکرول هنگام باز شدن مودال
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // اگر مودال باز نباشد، چیزی نمایش نده
  if (!isOpen) return null;

  const handleRouting = () => {
    onClose();
    router.push("/profile/notification");
  };

  const hasNotifications = notifications.length > 0;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-end bg-black/10 transition-opacity duration-700 ${animate ? "opacity-100" : "opacity-0"} `}
      onClick={onClose}
    >
      <div
        className="mt-0 ml-12 flex h-auto max-h-[90vh] w-[340px] flex-col rounded-md border-2 border-gray-200 bg-white sm:mt-7 sm:ml-27 md:ml-33 md:w-[380px] lg:w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* هدر */}
        <div className="flex flex-row justify-between px-4 py-5">
          <Text text="پیام ها" size="lg" weight="bold" />
          <button onClick={onClose} className="cursor-pointer">
            <CloseModalIcon size="xs" />
          </button>
        </div>

        {/* دکمه خواندن همه: فقط وقتی نوتیف داریم */}
        {hasNotifications && (
          <div className="flex flex-row items-center justify-end gap-1 border-t border-gray px-4 py-4">
            <Text text="خواندن همه" size="md" weight="medium" />
            <div className="cursor-pointer" onClick={onMarkAllRead}>
              <DualSquareEmpty size="md" />
            </div>
          </div>
        )}

        {/* لیست یا حالت خالی */}
        <div
          className={`flex h-[600px] flex-col overflow-y-auto ${
            hasNotifications ? "gap-3 border-t border-gray" : ""
          }`}
        >
          {hasNotifications ? (
            notifications.map((item) => (
              <NotificationItem
                key={item.id}
                {...item}
                onRemove={onRemove || (() => {})}
              />
            ))
          ) : (
            <div className="flex h-full items-center justify-center border-t border-gray px-4 text-center">
              <Text text="هیچ اعلانی ندارید" size="md" color="gray" />
            </div>
          )}
        </div>

        {/* فوتر: فقط وقتی نوتیف داریم */}
        {hasNotifications && (
          <div className="flex flex-col gap-3 border-t border-gray px-7 py-6">
            <DefaultButton
              type="primary"
              style="fill"
              label="مشاهده تمام پیام ها"
              action={handleRouting}
            />
          </div>
        )}
      </div>
    </div>
  );
}
