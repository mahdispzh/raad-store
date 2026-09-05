import type { Prisma } from "@/prisma/generated/prisma/client";
import { prisma } from "@/prisma/prisma";
import {
  LOW_STOCK_THRESHOLD,
  type NotificationData,
  type NotificationType,
} from "./notification.types";

const ADMIN_ROLE = 2;

type CreateNotificationInput = {
  userIds: number[];
  type: NotificationType;
  data: NotificationData;
  dedupeKey?: (userId: number) => string;
};

export async function createNotifications({
  userIds,
  type,
  data,
  dedupeKey,
}: CreateNotificationInput) {
  const recipients = [...new Set(userIds)];
  if (!recipients.length) return;

  await prisma.notifications.createMany({
    data: recipients.map((userId) => ({
      user_id: userId,
      type,
      data: data as Prisma.InputJsonValue,
      dedupe_key: dedupeKey?.(userId) ?? null,
    })),
    skipDuplicates: true,
  });
}

async function getAdminIds() {
  const admins = await prisma.users.findMany({
    where: { role: ADMIN_ROLE },
    select: { id: true },
  });

  return admins.map((admin) => admin.id);
}

export async function notifyOrderCreated(order: {
  id: number;
  user_id: number;
  total_price: number;
}) {
  const data = { orderId: order.id, totalPrice: order.total_price };
  const adminIds = await getAdminIds();

  await Promise.all([
    createNotifications({
      userIds: [order.user_id],
      type: "ORDER_CREATED",
      data,
      dedupeKey: (userId) => `order-created:${order.id}:${userId}`,
    }),
    createNotifications({
      userIds: adminIds,
      type: "ORDER_CREATED",
      data: { ...data, audience: "admin" },
      dedupeKey: (userId) => `order-created:${order.id}:${userId}`,
    }),
  ]);
}

export async function notifyOrderStatusChanged(order: {
  id: number;
  user_id: number;
  status: number;
}) {
  const data = { orderId: order.id, status: order.status };
  const adminIds = await getAdminIds();

  await Promise.all([
    createNotifications({
      userIds: [order.user_id],
      type: "ORDER_STATUS_CHANGED",
      data,
      dedupeKey: (userId) =>
        `order-status:${order.id}:${order.status}:${userId}`,
    }),
    createNotifications({
      userIds: adminIds,
      type: "ORDER_STATUS_CHANGED",
      data: { ...data, audience: "admin" },
      dedupeKey: (userId) =>
        `order-status:${order.id}:${order.status}:${userId}`,
    }),
  ]);
}

export async function notifyVariantStockChange(input: {
  productId: number;
  productName: string;
  variantId: number;
  previousStock: number;
  stock: number;
}) {
  const { productId, productName, variantId, previousStock, stock } = input;
  const data = { productId, productName, variantId, stock };

  if (previousStock === 0 && stock > 0) {
    const interestedUsers = await prisma.likes.findMany({
      where: { product_id: productId },
      select: { user_id: true },
    });

    await createNotifications({
      userIds: interestedUsers.map((like) => like.user_id),
      type: "PRODUCT_BACK_IN_STOCK",
      data,
      dedupeKey: (userId) => `back-in-stock:${variantId}:${userId}`,
    });
    return;
  }

  const adminIds = await getAdminIds();
  if (previousStock > 0 && stock === 0) {
    await createNotifications({
      userIds: adminIds,
      type: "PRODUCT_OUT_OF_STOCK",
      data,
      dedupeKey: (userId) => `out-of-stock:${variantId}:${userId}`,
    });
  } else if (
    previousStock > LOW_STOCK_THRESHOLD &&
    stock <= LOW_STOCK_THRESHOLD
  ) {
    await createNotifications({
      userIds: adminIds,
      type: "PRODUCT_LOW_STOCK",
      data,
      dedupeKey: (userId) => `low-stock:${variantId}:${userId}`,
    });
  }
}
