import { prisma } from "@/prisma/prisma";

export async function getAddressSummary() {
  const [
    totalAddresses,

    defaultAddresses,

    customAddresses,

    usersWithAddress,

    usersWithoutAddress,

    todayAddresses,

    thisMonthAddresses,

    uniqueProvinces,

    uniqueCities,
  ] = await Promise.all([
    prisma.user_addresses.count(),

    prisma.user_addresses.count({
      where: {
        default: true,
      },
    }),

    prisma.user_addresses.count({
      where: {
        OR: [{ default: false }, { default: null }],
      },
    }),

    prisma.users.count({
      where: {
        user_addresses: {
          some: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        user_addresses: {
          none: {},
        },
      },
    }),

    prisma.user_addresses.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    prisma.user_addresses.count({
      where: {
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),

    prisma.user_addresses.findMany({
      distinct: ["province"],
      select: {
        province: true,
      },
    }),

    prisma.user_addresses.findMany({
      distinct: ["city"],
      select: {
        city: true,
      },
    }),
  ]);

  return {
    totalAddresses,
    defaultAddresses,
    customAddresses,
    usersWithAddress,
    usersWithoutAddress,
    todayAddresses,
    thisMonthAddresses,
    uniqueProvinces: uniqueProvinces.length,
    uniqueCities: uniqueCities.length,
  };
}
/**
 * اطلاعات آماری کلی آدرس‌ها
 *
 * خروجی:
 * - totalAddresses: تعداد کل آدرس‌ها
 * - defaultAddresses: تعداد آدرس‌های پیش‌فرض
 * - customAddresses: تعداد آدرس‌های غیر پیش‌فرض
 * - usersWithAddress: تعداد کاربران دارای حداقل یک آدرس
 * - usersWithoutAddress: تعداد کاربران بدون آدرس
 * - todayAddresses: تعداد آدرس‌های ثبت‌شده امروز
 * - thisMonthAddresses: تعداد آدرس‌های ثبت‌شده در ماه جاری
 * - uniqueProvinces: تعداد استان‌های منحصربه‌فرد
 * - uniqueCities: تعداد شهرهای منحصربه‌فرد
 */
