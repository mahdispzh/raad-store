export const NotificationType = {
  ORDER_CREATED: "ORDER_CREATED",
  ORDER_STATUS_CHANGED: "ORDER_STATUS_CHANGED",
  PRODUCT_LOW_STOCK: "PRODUCT_LOW_STOCK",
  PRODUCT_OUT_OF_STOCK: "PRODUCT_OUT_OF_STOCK",
  PRODUCT_BACK_IN_STOCK: "PRODUCT_BACK_IN_STOCK",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export type NotificationData = Record<string, string | number | boolean | null>;

export const LOW_STOCK_THRESHOLD = 5;
