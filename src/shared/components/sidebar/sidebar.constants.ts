// _constants/sidebar._constants.ts

import { AlarmMessageIcon } from "../../constants/icons/alarm-message-icon";
import { ChatIcon } from "../../constants/icons/chat-icon";
import { CommentIcon } from "../../constants/icons/comment-icon";
import { ExitIcon } from "../../constants/icons/exit-icon";
import { HistoryIcon } from "../../constants/icons/history-icon";
import { HomeIcon } from "../../constants/icons/home-icon";
import { LikeIcon } from "../../constants/icons/like-icon";
import { LocationPinIcon } from "../../constants/icons/location-pin-icon";
import { OrderIcon } from "../../constants/icons/order-icon";
import { PencilIcon } from "../../constants/icons/pencil-icon";
import { UserProfileIcon } from "../../constants/icons/user-profile-icon";

// نگاشت آیکون‌های سایدبار
export const sidebarIcons = {
  home: HomeIcon,
  order: OrderIcon,
  like: LikeIcon,
  comment: CommentIcon,
  location: LocationPinIcon,
  message: AlarmMessageIcon,
  ticket: ChatIcon,
  history: HistoryIcon,
  profile: UserProfileIcon,
  exit: ExitIcon,
  pencil: PencilIcon,
} as const;

export type SidebarIconKey = keyof typeof sidebarIcons;
