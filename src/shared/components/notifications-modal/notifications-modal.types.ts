export type CategoryType = "order" | "favorite" | "comment" | "delivery";

export interface NotificationItem {
  id: string;
  category: CategoryType;
  text: string;
  time: string;
  extraData: string;
  isRead: boolean;
}

export interface NotificationItemProps extends NotificationItem {
  onRemove: (id: string) => void;
}

// notifications-modal.types.ts
export interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onViewAll?: () => void;
  onRemove?: (id: string) => void;
  onMarkAllRead?: () => void;
}