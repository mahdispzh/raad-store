"use client";

import { Logout } from "@/src/shared/components/dashboard-logout/logout-dashboard";
import {
  CommentIcon,
  DashboardUserIcon,
  ExitIcon,
  UserProfileIcon,
} from "@/src/shared/constants/icons";
import { Badge, Text } from "@/src/shared/ui";
import {
  DEFAULT_LOGOUT_TEXT,
  DEFAULT_MSG_TEXT,
  DEFAULT_NAME,
  DEFAULT_PROFILE_TEXT,
} from "../_constants/dashboard-home.constants";
import { useActionCard } from "../_hooks/useDashboardHome";
import { ActionCardProps } from "../_types/dashboard-home.types";
import ActionButton from "../_ui/action-button/action-button.ui";

export function ActionCard({
  name = DEFAULT_NAME,
  msgText = DEFAULT_MSG_TEXT,
  profileText = DEFAULT_PROFILE_TEXT,
  logoutText = DEFAULT_LOGOUT_TEXT,
  onMsg,
  onProfile,
  onLogout,
}: ActionCardProps) {
  const {
    onMsg: defaultOnMsg,
    onProfile: defaultOnProfile,
    onLogout: defaultOnLogout,
  } = useActionCard();

  return (
    <div className="flex h-full w-full flex-col items-center rounded-sm bg-pure-white px-4 py-7 shadow-xl">
      <div className="mb-3 flex h-[4.2vw] w-[4.2vw] items-center justify-center rounded-full">
        <DashboardUserIcon color="text-gray" size="2xl" />
      </div>

      <Text text={name} color="primary" size="lg" weight="bold" />

      <div className="flex flex-row items-center justify-center gap-3 pt-7 pb-7">
        {/* دکمه پیام */}
        <ActionButton
          label={msgText}
          action={onMsg || defaultOnMsg}
          icon={
            <div className="relative">
              <CommentIcon size="md" color="text-secondary" />
              <Badge type="messages" number={1} />
            </div>
          }
        />

        {/* دکمه پروفایل */}
        <ActionButton
          label={profileText}
          action={onProfile || defaultOnProfile}
          icon={<UserProfileIcon size="md" color="text-Secondary" />}
        />

        {/* دکمه خروج با مودال */}
        <Logout
          trigger={
            <ActionButton
              label={logoutText}
              action={() => {}}
              icon={<ExitIcon size="md" color="text-Secondary" />}
            />
          }
        />
      </div>
    </div>
  );
}
