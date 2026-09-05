export type CurrentUser = {
  id: number;
  name: string | null;
  mail: string | null;
  phone: string | null;
  role: number;
  image_id: number | null;
};

export type NotificationCategory =
  | "order"
  | "favorite"
  | "comment"
  | "delivery";

export type NotificationItem = {
  id: string;
  category: NotificationCategory;
  text: string;
  extraData: string;
  time: string;
  isRead: boolean;
};
