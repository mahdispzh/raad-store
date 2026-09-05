// api/protected/admin-overview/payments/_lib/summary.ts
import { prisma } from "@/prisma/prisma";
import { calculateGrowth } from "@/src/shared/utils/analytics";

export async function getPaymentsSummary() {
  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
  const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
  const last30DaysStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const prev30DaysStart = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

  const [
    totalPayments,
    successfulPayments,
    failedPayments,
    pendingPayments,
    unspecifiedPayments, // ✅ status: 3
    totalIncome,
    todayIncome,
    averagePayment,
    cashPayments,
    onlinePayments,
    paidToday,
    paidThisMonth,
    last30DaysIncome, // ✅ برای محاسبه میانگین درآمد روزانه (ماهانه)
    yesterdayIncome, // ✅ برای رشد درآمد امروز
    thisMonthIncome, // ✅ برای رشد درآمد ماهانه
    lastMonthIncome, // ✅ برای رشد درآمد ماهانه
    prev30DaysIncome, // ✅ برای رشد میانگین درآمد روزانه
    thisMonthTotalPayments, // ✅ برای رشد تعداد کل پرداخت‌ها
    lastMonthTotalPayments, // ✅ برای رشد تعداد کل پرداخت‌ها
    lastMonthSuccessfulPayments, // ✅ برای رشد تعداد پرداخت‌های موفق
  ] = await Promise.all([
    prisma.payments.count(),

    prisma.payments.count({ where: { status: 1 } }),
    prisma.payments.count({ where: { status: 2 } }),
    prisma.payments.count({ where: { status: 0 } }),
    prisma.payments.count({ where: { status: 3 } }), // ✅ نامشخص

    prisma.payments.aggregate({
      where: { status: 1 },
      _sum: { amount: true },
    }),

    prisma.payments.aggregate({
      where: {
        status: 1,
        created_at: { gte: todayStart },
      },
      _sum: { amount: true },
    }),

    prisma.payments.aggregate({
      where: { status: 1 },
      _avg: { amount: true },
    }),

    prisma.payments.count({ where: { payment_method: "cash" } }),
    prisma.payments.count({ where: { payment_method: "online" } }),

    prisma.payments.count({
      where: {
        status: 1,
        created_at: { gte: todayStart },
      },
    }),

    prisma.payments.count({
      where: {
        status: 1,
        created_at: { gte: thisMonthStart },
      },
    }),

    prisma.payments.aggregate({
      where: {
        status: 1,
        created_at: { gte: last30DaysStart },
      },
      _sum: { amount: true },
    }),

    prisma.payments.aggregate({
      where: {
        status: 1,
        created_at: { gte: yesterdayStart, lt: todayStart },
      },
      _sum: { amount: true },
    }),

    prisma.payments.aggregate({
      where: {
        status: 1,
        created_at: { gte: thisMonthStart },
      },
      _sum: { amount: true },
    }),

    prisma.payments.aggregate({
      where: {
        status: 1,
        created_at: { gte: lastMonthStart, lt: thisMonthStart },
      },
      _sum: { amount: true },
    }),

    prisma.payments.aggregate({
      where: {
        status: 1,
        created_at: { gte: prev30DaysStart, lt: last30DaysStart },
      },
      _sum: { amount: true },
    }),

    prisma.payments.count({
      where: {
        created_at: { gte: thisMonthStart },
      },
    }),

    prisma.payments.count({
      where: {
        created_at: { gte: lastMonthStart, lt: thisMonthStart },
      },
    }),

    prisma.payments.count({
      where: {
        status: 1,
        created_at: { gte: lastMonthStart, lt: thisMonthStart },
      },
    }),
  ]);

  const thisMonthIncomeValue = thisMonthIncome._sum.amount ?? 0;
  const lastMonthIncomeValue = lastMonthIncome._sum.amount ?? 0;
  const last30DaysIncomeValue = last30DaysIncome._sum.amount ?? 0;
  const prev30DaysIncomeValue = prev30DaysIncome._sum.amount ?? 0;

  return {
    totalPayments,
    successfulPayments,
    failedPayments,
    pendingPayments,
    unspecifiedPayments, // ✅
    totalIncome: totalIncome._sum.amount ?? 0,
    todayIncome: todayIncome._sum.amount ?? 0,
    averagePayment: Math.round(averagePayment._avg.amount ?? 0),
    cashPayments,
    onlinePayments,
    paidToday,
    paidThisMonth,
    averageDailyIncome: Math.round(last30DaysIncomeValue / 30), // ✅ میانگین درآمد روزانه (بر اساس ۳۰ روز اخیر)

    // ✅ درصدهای رشد — از calculateGrowth مشترک (قبلاً calcGrowth محلی بود)
    monthlyIncomeGrowth: calculateGrowth(thisMonthIncomeValue, lastMonthIncomeValue),
    todayIncomeGrowth: calculateGrowth(
      todayIncome._sum.amount ?? 0,
      yesterdayIncome._sum.amount ?? 0,
    ),
    averageDailyIncomeGrowth: calculateGrowth(
      last30DaysIncomeValue,
      prev30DaysIncomeValue,
    ),
    totalPaymentsGrowth: calculateGrowth(thisMonthTotalPayments, lastMonthTotalPayments),
    successfulPaymentsGrowth: calculateGrowth(paidThisMonth, lastMonthSuccessfulPayments),
  };
}