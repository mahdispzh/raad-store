import { prisma } from "@/prisma/prisma";

export async function getAddressReport(id: number) {
  const [addressList, defaultAddress, latestAddresses] = await Promise.all([
    prisma.user_addresses.findMany({
      where: {
        user_id: id,
      },
      orderBy: {
        created_at: "desc",
      },
    }),

    prisma.user_addresses.findFirst({
      where: {
        user_id: id,
        default: true,
      },
    }),

    prisma.user_addresses.findMany({
      where: {
        user_id: id,
      },
      take: 5,
      orderBy: {
        created_at: "desc",
      },
    }),
  ]);

  return {
    addressList,

    defaultAddress,

    latestAddresses,
  };
}
/**
 * خروجی گزارش آدرس‌های کاربر
 *
 * addressList
 * لیست تمام آدرس‌های کاربر
 *
 * defaultAddress
 * آدرس پیش‌فرض کاربر
 *
 * latestAddresses
 * ۵ آدرس آخر ثبت شده
 */
