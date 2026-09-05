import { prisma } from "@/prisma/prisma";

export async function getPaymentsReport() {
  const [
    latestPayments,
    biggestPayments,
    failedPaymentsReport,
    pendingPaymentsReport,
    latestSuccessfulPayments,
  ] = await Promise.all([
    prisma.payments.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        orders: true,
      },
    }),

    prisma.payments.findMany({
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

    prisma.payments.findMany({
      where: {
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
  ]);

  return {
    latestPayments,
    biggestPayments,
    failedPayments: failedPaymentsReport,
    pendingPayments: pendingPaymentsReport,
    latestSuccessfulPayments,
  };
}
/**
 * دریافت گزارش‌های داشبورد پرداخت‌ها
 *
 * خروجی:
 * - latestPayments: ۱۰ پرداخت آخر
 * - biggestPayments: ۱۰ پرداخت با بیشترین مبلغ
 * - failedPayments: ۱۰ پرداخت ناموفق
 * - pendingPayments: ۱۰ پرداخت در انتظار
 * - latestSuccessfulPayments: ۱۰ پرداخت موفق اخیر
 */
