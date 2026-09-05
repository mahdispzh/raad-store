import { prisma } from "@/prisma/prisma";

export async function getOrdersSummary() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const week = new Date(today);
  week.setDate(week.getDate() - 7);

  const month = new Date(today);
  month.setMonth(month.getMonth() - 1);

  const [
    totalOrders,
    todayOrders,
    yesterdayOrders,
    thisWeekOrders,
    thisMonthOrders,
    pendingOrders,
    confirmedOrders,
    preparingOrders,
    readyToShipOrders,
    shippedOrders,
    deliveredOrders,
    returnedOrders,

    paidOrders,
    unpaidOrders,
    // ✅ جدید — payment_status چهار حالت داره (۰=در انتظار، ۱=موفق، ۲=ناموفق، ۳=نامشخص)
    // قبلاً فقط status:0 و status:1 شمرده می‌شد و ۲/۳ اصلاً لحاظ نمی‌شدن
    failedPaymentOrders,
    unspecifiedPaymentOrders,

    revenueAggregate,
    todayRevenueAggregate,
    yesterdayRevenueAggregate,
    averageOrderAggregate,

    lastMonthOrders,
    thisMonthAverageOrderAggregate,
    lastMonthAverageOrderAggregate,
     lastWeekOrders,
  thisWeekPaidOrders,
  lastWeekPaidOrders,
  ] = await Promise.all([
    prisma.orders.count(),

    prisma.orders.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    prisma.orders.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000),
          lt: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    prisma.orders.count({
      where: {
        created_at: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),

    prisma.orders.count({
      where: {
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),

    prisma.orders.count({
      where: {
        status: 0,
      },
    }),

    prisma.orders.count({
      where: {
        status: 1,
      },
    }),

    prisma.orders.count({
      where: {
        status: 2,
      },
    }),

    prisma.orders.count({
      where: {
        status: 3,
      },
    }),

    prisma.orders.count({
      where: {
        status: 4,
      },
    }),

    prisma.orders.count({
      where: {
        status: 5,
      },
    }),

    prisma.orders.count({
      where: {
        status: 6,
      },
    }),

    prisma.orders.count({
      where: {
        payment_status: 1,
      },
    }),

    prisma.orders.count({
      where: {
        payment_status: 0,
      },
    }),

    // ✅ جدید
    prisma.orders.count({
      where: {
        payment_status: 2,
      },
    }),

    prisma.orders.count({
      where: {
        payment_status: 3,
      },
    }),

    prisma.orders.aggregate({
      _sum: {
        total_price: true,
      },
    }),

    prisma.orders.aggregate({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      _sum: {
        total_price: true,
      },
    }),

    prisma.orders.aggregate({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000),
          lt: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      _sum: {
        total_price: true,
      },
    }),

    prisma.orders.aggregate({
      _avg: {
        total_price: true,
      },
    }),

    prisma.orders.count({
      where: {
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),

    prisma.orders.aggregate({
      where: {
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _avg: { total_price: true },
    }),

    prisma.orders.aggregate({
      where: {
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _avg: { total_price: true },
    }),

  prisma.orders.count({
    where: {
      created_at: {
        gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  }),

  prisma.orders.count({
    where: {
      payment_status: 1,
      created_at: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  }),

  prisma.orders.count({
    where: {
      payment_status: 1,
      created_at: {
        gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  }),
]);

 

  return {
    totalOrders,

    todayOrders,
    yesterdayOrders,
    thisWeekOrders,
    thisMonthOrders,

    pendingOrders,
    confirmedOrders,
    preparingOrders,
    readyToShipOrders,
    shippedOrders,
    deliveredOrders,
    returnedOrders,

    paidOrders,
    unpaidOrders,
    // ✅ جدید
    failedPaymentOrders,
    unspecifiedPaymentOrders,

    totalRevenue: revenueAggregate._sum.total_price ?? 0,

    todayRevenue: todayRevenueAggregate._sum.total_price ?? 0,
    yesterdayRevenue: yesterdayRevenueAggregate._sum.total_price ?? 0,

    averageOrderValue: Math.round(averageOrderAggregate._avg.total_price ?? 0),

     lastMonthOrders,
  thisMonthAverageOrderValue: Math.round(thisMonthAverageOrderAggregate._avg.total_price ?? 0),
  lastMonthAverageOrderValue: Math.round(lastMonthAverageOrderAggregate._avg.total_price ?? 0),

  lastWeekOrders,
  thisWeekPaidOrders,
  lastWeekPaidOrders,
  };
}
/**
 * دریافت خلاصه آماری سفارش‌ها
 *
 * خروجی:
 * - totalOrders: تعداد کل سفارش‌ها
 * - todayOrders: تعداد سفارش‌های ثبت شده امروز
 * - yesterdayOrders: تعداد سفارش‌های ثبت شده دیروز
 * - thisWeekOrders: تعداد سفارش‌های ثبت شده در ۷ روز اخیر
 * - thisMonthOrders: تعداد سفارش‌های ثبت شده در ماه جاری
 * - pendingOrders: تعداد سفارش‌های در انتظار تایید
 * - confirmedOrders: تعداد سفارش‌های تایید اولیه
 * - preparingOrders: تعداد سفارش‌های در حال آماده‌سازی
 * - readyToShipOrders: تعداد سفارش‌های آماده ارسال
 * - shippedOrders: تعداد سفارش‌های تحویل شده به پست
 * - deliveredOrders: تعداد سفارش‌های تحویل شده به مشتری
 * - returnedOrders: تعداد سفارش‌های مرجوع شده
 * - paidOrders: تعداد سفارش‌های payment_status=1 (موفق)
 * - unpaidOrders: تعداد سفارش‌های payment_status=0 (در انتظار)
 * - failedPaymentOrders: تعداد سفارش‌های payment_status=2 (ناموفق) — ✅ جدید
 * - unspecifiedPaymentOrders: تعداد سفارش‌های payment_status=3 (نامشخص) — ✅ جدید
 * - totalRevenue: مجموع درآمد حاصل از سفارش‌ها
 * - todayRevenue: درآمد حاصل از سفارش‌های امروز
 * - yesterdayRevenue: درآمد حاصل از سفارش‌های دیروز
 * - averageOrderValue: میانگین مبلغ هر سفارش
 */