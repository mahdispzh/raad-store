import { prisma } from "@/prisma/prisma";

export async function getOrdersSummary(id: number) {
  const [
    totalOrders,

    pendingOrders,
    confirmedOrders,
    preparingOrders,
    readyToSendOrders,
    shippedOrders,
    deliveredOrders,
    returnedOrders,

    totalSpent,
    averageOrder,

    lastOrder,
  ] = await Promise.all([
    prisma.orders.count({
      where: {
        user_id: id,
      },
    }),

    prisma.orders.count({
      where: {
        user_id: id,
        status: 0,
      },
    }),

    prisma.orders.count({
      where: {
        user_id: id,
        status: 1,
      },
    }),

    prisma.orders.count({
      where: {
        user_id: id,
        status: 2,
      },
    }),

    prisma.orders.count({
      where: {
        user_id: id,
        status: 3,
      },
    }),

    prisma.orders.count({
      where: {
        user_id: id,
        status: 4,
      },
    }),

    prisma.orders.count({
      where: {
        user_id: id,
        status: 5,
      },
    }),

    prisma.orders.count({
      where: {
        user_id: id,
        status: 6,
      },
    }),

    prisma.orders.aggregate({
      where: {
        user_id: id,
      },
      _sum: {
        total_price: true,
      },
    }),

    prisma.orders.aggregate({
      where: {
        user_id: id,
      },
      _avg: {
        total_price: true,
      },
    }),

    prisma.orders.findFirst({
      where: {
        user_id: id,
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        total_price: true,
        status: true,
        created_at: true,
      },
    }),
  ]);

  return {
    totalOrders,

    pendingOrders,
    confirmedOrders,
    preparingOrders,
    readyToSendOrders,
    shippedOrders,
    deliveredOrders,
    returnedOrders,

    totalSpent: totalSpent._sum.total_price ?? 0,

    averageOrderPrice: Math.round(averageOrder._avg.total_price ?? 0),

    lastOrder,
  };
}
/**
 * خروجی خلاصه سفارش‌های کاربر
 *
 * totalOrders
 * تعداد کل سفارش‌های ثبت‌شده توسط کاربر
 *
 * pendingOrders
 * تعداد سفارش‌های در انتظار تایید
 *
 * confirmedOrders
 * تعداد سفارش‌های تایید اولیه
 *
 * preparingOrders
 * تعداد سفارش‌های در حال آماده‌سازی
 *
 * readyToSendOrders
 * تعداد سفارش‌های آماده ارسال
 *
 * shippedOrders
 * تعداد سفارش‌های تحویل‌شده به پست
 *
 * deliveredOrders
 * تعداد سفارش‌های تحویل‌شده به مشتری
 *
 * returnedOrders
 * تعداد سفارش‌های مرجوع‌شده
 *
 * totalSpent
 * مجموع مبلغ سفارش‌های ثبت‌شده توسط کاربر
 *
 * averageOrderPrice
 * میانگین مبلغ هر سفارش کاربر
 *
 * lastOrder
 * آخرین سفارش ثبت‌شده توسط کاربر
 */
