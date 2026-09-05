import { prisma } from "@/prisma/prisma";

export async function getPaymentsSummary(id: number) {
  const [
    totalPayments,

    successfulPayments,
    pendingPayments,
    failedPayments,

    totalPaid,

    averagePayment,

    lastPayment,
  ] = await Promise.all([
    prisma.payments.count({
      where: {
        orders: {
          user_id: id,
        },
      },
    }),

    prisma.payments.count({
      where: {
        orders: {
          user_id: id,
        },
        status: 1,
      },
    }),

    prisma.payments.count({
      where: {
        orders: {
          user_id: id,
        },
        status: 0,
      },
    }),

    prisma.payments.count({
      where: {
        orders: {
          user_id: id,
        },
        status: 2,
      },
    }),

    prisma.payments.aggregate({
      where: {
        orders: {
          user_id: id,
        },
        status: 1,
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.payments.aggregate({
      where: {
        orders: {
          user_id: id,
        },
        status: 1,
      },
      _avg: {
        amount: true,
      },
    }),

    prisma.payments.findFirst({
      where: {
        orders: {
          user_id: id,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    }),
  ]);

  const summary = {};

  return {
    totalPayments,

    successfulPayments,

    pendingPayments,

    failedPayments,

    totalPaid: totalPaid._sum.amount ?? 0,

    averagePayment: Math.round(averagePayment._avg.amount ?? 0),

    lastPayment,
  };
}

//* خروجی خلاصه پرداخت‌های کاربر

//! totalPayments
//? تعداد کل پرداخت‌های کاربر

//! successfulPayments
//? تعداد پرداخت‌های موفق
//?
//! pendingPayments
//? تعداد پرداخت‌های در انتظار
//?
//! failedPayments
//? تعداد پرداخت‌های ناموفق
//?
//! totalPaid
//? مجموع مبالغ پرداخت‌های موفق
//?
//! averagePayment
//? میانگین مبلغ پرداخت‌های موفق
//?
//! lastPayment
//? آخرین پرداخت ثبت‌شده توسط کاربر
