"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  CloseModalIcon,
  DualSquareEmpty,
  NotificationIcon,
  SearchIcon,
} from "../../constants/icons";

import { Badge, DefaultButton, Text } from "../../ui";
import { StyledButton } from "../../ui/styled-button/styled-button.ui";

import {
  AVATAR_OPTIONS,
  DEFAULT_AVATAR,
} from "../../../app/dashboard/profile/_constants/avatars";
import { categoryColors, categoryIcons } from "./topbar.constants";
import { useTopBar } from "./useTopBar";

export function TopBar() {
  const router = useRouter();

  const {
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
  } = useTopBar();

  const handleViewAll = () => {
    closeNotif();
    router.push("/profile/notification");
  };
  const avatarSrc =
    AVATAR_OPTIONS.find((avatar) => avatar.id === user?.image_id)?.src ??
    DEFAULT_AVATAR;

  return (
    <header className="flex h-[5vw] items-center justify-between rounded-[0.6vw] border-[1px] border-accent bg-white px-[1.5vw] shadow-3xs">
      {/* Right */}
      <div className="flex items-center gap-[1.5vw]">
        <div className="relative">
          <Image
            src={avatarSrc}
            alt="avatar"
            width={40}
            height={40}
            className="h-[3vw] w-[3vw] rounded-full"
          />

          <span className="absolute right-[0.1vw] bottom-[0.1vw] h-[0.65vw] w-[0.65vw] rounded-full border-[0.15vw] border-white bg-success" />
        </div>

        <button className="flex items-center gap-[0.75vw]">
          <div className="text-right">
            <Text
              text={userLoading ? "..." : user?.name || "کاربر"}
              size="lg"
              color="secondary"
              weight="light"
            />

            <Text
              text={userLoading ? "" : user?.phone || ""}
              size="sm"
              color="secondary"
              weight="light"
            />
          </div>
        </button>
      </div>

      {/* Left */}
      <div className="flex items-center gap-[1vw]">
        <Text text={today} color="secondary" size="lg" weight="regular" />

        <div className="flex h-[3vw] w-[30vw] items-center gap-[0.5vw] rounded-sm bg-accent/50 px-[1vw]">
          <SearchIcon size="sm" color="text-secondary" />

          <input
            placeholder="جستجو..."
            className="text-light w-full bg-transparent text-sm text-secondary outline-none placeholder:text-secondary"
          />
        </div>

        <div className="relative flex h-[3vw] w-[3vw] items-center justify-center rounded-full bg-accent/50">
          <StyledButton
            variant="icon"
            icon={<NotificationIcon size="sm" color="text-secondary" />}
            action={openNotif}
          />

          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1">
              <Badge type="number" number={unreadCount} />
            </div>
          )}
        </div>
      </div>

      {/* ===== Notifications Drawer (inline) ===== */}
      {isNotifOpen && (
        <div className="fixed inset-0 z-100 bg-black/10" onClick={closeNotif}>
          <div
            className="fixed top-14 left-20 z-50 flex h-auto max-h-[90vh] w-[420px] flex-col rounded-md border-2 border-gray-200 bg-white transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* هدر */}
            <div className="flex flex-row items-center justify-between border-b border-gray px-5 py-5">
              <Text text="پیام ها" size="lg" weight="bold" />
              <div onClick={closeNotif} className="cursor-pointer">
                <CloseModalIcon size="sm" />
              </div>
            </div>

            <div className="flex flex-row items-center justify-end gap-1 px-4 py-4">
              <Text text="خواندن همه" size="md" weight="medium" />
              <div
                className="cursor-pointer"
                onClick={() => void markAllRead()}
              >
                <DualSquareEmpty size="md" />
              </div>
            </div>

            {/* لیست */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-3">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex h-auto w-full flex-row items-start justify-between bg-white p-3 hover:bg-accent/30"
                  >
                    <div className="flex flex-row items-start gap-2">
                      <div className="flex flex-col items-start gap-4 pl-10">
                        <div className="flex flex-row items-center gap-2">
                          <div
                            className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${categoryColors[item.category]}`}
                          >
                            {categoryIcons[item.category]}
                          </div>
                          <Text
                            text={item.text}
                            size="md"
                            weight="regular"
                            color="primary"
                          />
                          {!item.isRead && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-danger" />
                          )}
                        </div>
                        <Text
                          text={item.extraData}
                          size="sm"
                          weight="regular"
                          color="secondary"
                        />
                        <Text
                          text={item.time}
                          size="sm"
                          weight="regular"
                          color="gray"
                        />
                      </div>
                    </div>

                    <button
                      className="cursor-pointer"
                      onClick={() => void removeNotif(item.id)}
                    >
                      <CloseModalIcon size="xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* فوتر */}
            <div className="px-5 py-9">
              <DefaultButton
                type="secondary"
                style="fill"
                label="مشاهده تمام پیام ها"
                action={handleViewAll}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
