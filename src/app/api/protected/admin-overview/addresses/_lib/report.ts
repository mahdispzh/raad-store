import { prisma } from "@/prisma/prisma";

export async function getAddressReport() {
  const [
    latestAddresses,

    defaultAddressList,

    usersWithMostAddresses,

    provinces,

    cities,
  ] = await Promise.all([
    prisma.user_addresses.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        users: true,
      },
    }),

    prisma.user_addresses.findMany({
      where: {
        default: true,
      },
      take: 10,
      include: {
        users: true,
      },
    }),

    prisma.users.findMany({
      take: 10,
      orderBy: {
        user_addresses: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            user_addresses: true,
          },
        },
      },
    }),

    prisma.user_addresses.groupBy({
      by: ["province"],
      _count: true,
      orderBy: {
        _count: {
          province: "desc",
        },
      },
    }),

    prisma.user_addresses.groupBy({
      by: ["city"],
      _count: true,
      orderBy: {
        _count: {
          city: "desc",
        },
      },
    }),
  ]);

  return {
    latestAddresses,
    defaultAddressList,
    usersWithMostAddresses,
    provinces,
    cities,
  };
}
/**
 * گزارش‌های قابل نمایش در جدول‌های داشبورد
 *
 * خروجی:
 * - latestAddresses: آخرین ۱۰ آدرس ثبت‌شده
 * - defaultAddressList: ۱۰ آدرس پیش‌فرض
 * - usersWithMostAddresses: ۱۰ کاربری که بیشترین آدرس را دارند
 * - provinces: تعداد آدرس‌ها به تفکیک استان
 * - cities: تعداد آدرس‌ها به تفکیک شهر
 */
