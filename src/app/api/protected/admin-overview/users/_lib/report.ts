import { prisma } from "@/prisma/prisma";

export async function getUserReport() {
  const [
    newestUsers,
    topCustomers,
    topCommenters,
    topBlogAuthors,
    usersWithoutOrders,
    usersWithoutAddress,
  ] = await Promise.all([
    prisma.users.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
    }),

    prisma.users.findMany({
      take: 10,
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
        // ✅ آخرین سفارش هر کاربر — nulls: "last" تا سفارش‌هایی که created_at
        // خالی دارن (مشکل دیتا) رو به ته لیست بندازه و آخرین سفارشِ واقعیِ
        // دارای تاریخ انتخاب بشه، نه یه رکورد null
        orders: {
          take: 1,
          orderBy: {
            created_at: { sort: "desc", nulls: "last" },
          },
          select: {
            created_at: true,
          },
        },
      },
    }),

    prisma.users.findMany({
      take: 10,
      orderBy: {
        comments: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    }),

    prisma.users.findMany({
      take: 10,
      orderBy: {
        blogs: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            blogs: true,
          },
        },
      },
    }),

    prisma.users.findMany({
      where: {
        orders: {
          none: {},
        },
      },
      take: 10,
    }),

    prisma.users.findMany({
      where: {
        user_addresses: {
          none: {},
        },
      },
      take: 10,
    }),
  ]);

  return {
    newestUsers,
    topCustomers,
    topCommenters,
    topBlogAuthors,
    usersWithoutOrders,
    usersWithoutAddress,
  };
}
/**
 * خروجی گزارش کاربران
 *
 * newestUsers
 * ۱۰ کاربر جدید
 *
 * topCustomers
 * ۱۰ کاربر با بیشترین سفارش
 *
 * topCommenters
 * ۱۰ کاربر با بیشترین تعداد کامنت
 *
 * topBlogAuthors
 * ۱۰ نویسنده با بیشترین تعداد بلاگ
 *
 * usersWithoutOrders
 * ۱۰ کاربر بدون سفارش
 *
 * usersWithoutAddress
 * ۱۰ کاربر بدون آدرس
 */