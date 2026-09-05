import { prisma } from "@/prisma/prisma";

export async function getOrdersReport() {
  const [
    latestOrders,
    highestValueOrders,
    returnedOrdersReport,
    pendingOrdersReport,
    deliveredOrdersReport,
    unpaidOrdersReport,
    topCustomers,
  ] = await Promise.all([
    prisma.orders.findMany({
      where: {
        created_at: {
          not: null,
        },
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        users: true,
        payments: true,
      },
      
    }),
prisma.orders.findMany({
  take: 10,
  orderBy: {
    total_price: "desc",
  },
  include: {
    users: true,
    payments: true,
    // ✅ برای نمایش عکس اولین آیتم سبد خرید در "برترین سفارش‌ها"
    order_items: {
      take: 1,
      orderBy: { id: "asc" },
      include: {
        products: {
          select: { images: true },
        },
      },
    },
  },
}),

    prisma.orders.findMany({
      where: {
        status: 6,
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        users: true,
        payments: true,
      },
    }),

    prisma.orders.findMany({
      where: {
        status: 0,
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        users: true,
        payments: true,
      },
    }),

    prisma.orders.findMany({
      where: {
        status: 5,
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        users: true,
        payments: true,
      },
    }),

    prisma.orders.findMany({
      where: {
        payment_status: 0,
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        users: true,
        payments: true,
      },
    }),

    prisma.users.findMany({
      take: 10,
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        _count: {
          select: {
            orders: true,
          },
        },
      },
    }),
  ]);

  return {
    latestOrders,
    highestValueOrders,
    returnedOrders: returnedOrdersReport,
    pendingOrders: pendingOrdersReport,
    deliveredOrders: deliveredOrdersReport,
    unpaidOrders: unpaidOrdersReport,
    topCustomers,
  };
}
/**
 * دریافت گزارش‌های داشبورد سفارش‌ها
 *
 * خروجی:
 * - latestOrders: ۴ سفارش آخر (جدیدترین‌ها)
 * - highestValueOrders: ۱۰ سفارش با بیشترین مبلغ
 * - returnedOrders: ۱۰ سفارش مرجوع شده
 * - pendingOrders: ۱۰ سفارش در انتظار تایید
 * - deliveredOrders: ۱۰ سفارش تحویل شده
 * - unpaidOrders: ۱۰ سفارش پرداخت نشده
 * - topCustomers: ۱۰ کاربر با بیشترین تعداد سفارش
 */