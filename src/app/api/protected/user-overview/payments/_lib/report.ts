import { prisma } from "@/prisma/prisma";

export async function getPaymentsReport(id: number) {
  const [
    latestPayments,

    highestPayments,

    successfulPaymentList,

    pendingPaymentList,

    failedPaymentList,
  ] = await Promise.all([
    prisma.payments.findMany({
      where: {
        orders: {
          user_id: id,
        },
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        orders: true,
      },
    }),

    prisma.payments.findMany({
      where: {
        orders: {
          user_id: id,
        },
        status: 1,
      },
      take: 10,
      orderBy: {
        amount: "desc",
      },
      include: {
        orders: true,
      },
    }),

    prisma.payments.findMany({
      where: {
        orders: {
          user_id: id,
        },
        status: 1,
      },
      take: 10,
      orderBy: {
        paid_at: "desc",
      },
      include: {
        orders: true,
      },
    }),

    prisma.payments.findMany({
      where: {
        orders: {
          user_id: id,
        },
        status: 0,
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        orders: true,
      },
    }),

    prisma.payments.findMany({
      where: {
        orders: {
          user_id: id,
        },
        status: 2,
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        orders: true,
      },
    }),
  ]);

  return {
    latestPayments,

    highestPayments,

    successfulPaymentList,

    pendingPaymentList,

    failedPaymentList,
  };
}
/**
 * خروجی گزارش پرداخت‌های کاربر
 *
 * latestPayments
 * آخرین پرداخت‌های ثبت‌شده
 *
 * highestPayments
 * بیشترین پرداخت‌ها بر اساس مبلغ
 *
 * successfulPaymentList
 * لیست آخرین پرداخت‌های موفق
 *
 * pendingPaymentList
 * لیست پرداخت‌های در انتظار
 *
 * failedPaymentList
 * لیست پرداخت‌های ناموفق
 */
