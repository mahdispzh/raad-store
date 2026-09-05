import { prisma } from "@/prisma/prisma";

export async function getAddressSummary(id: number) {
  const [totalAddresses, defaultAddresses, customAddresses, lastAddress] =
    await Promise.all([
      prisma.user_addresses.count({
        where: {
          user_id: id,
        },
      }),

      prisma.user_addresses.count({
        where: {
          user_id: id,
          default: true,
        },
      }),

      prisma.user_addresses.count({
        where: {
          user_id: id,
          OR: [
            {
              default: false,
            },
            {
              default: null,
            },
          ],
        },
      }),

      prisma.user_addresses.findFirst({
        where: {
          user_id: id,
        },
        orderBy: {
          created_at: "desc",
        },
      }),
    ]);

  return {
    totalAddresses,

    defaultAddresses,

    customAddresses,

    lastAddress,
  };
}

/**
 * خروجی خلاصه کاربران
 *
 * totalUsers
 * تعداد کل کاربران
 *
 * todayUsers
 * تعداد کاربران ثبت‌نام شده امروز
 *
 * thisWeekUsers
 * تعداد کاربران ثبت‌نام شده در ۷ روز اخیر
 *
 * thisMonthUsers
 * تعداد کاربران ثبت‌نام شده در ماه جاری
 *
 * totalAdmins
 * تعداد ادمین‌ها
 *
 * totalCustomers
 * تعداد مشتریان
 *
 * usersWithOrders
 * تعداد کاربران دارای سفارش
 *
 * usersWithoutOrdersCount
 * تعداد کاربران بدون سفارش
 *
 * usersWithAddress
 * تعداد کاربران دارای آدرس
 *
 * usersWithoutAddressCount
 * تعداد کاربران بدون آدرس
 *
 * usersWithRecentlyViewed
 * تعداد کاربران دارای تاریخچه بازدید
 *
 * usersWithRecentlySearch
 * تعداد کاربران دارای تاریخچه جستجو
 */
