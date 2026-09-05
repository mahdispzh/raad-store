import { prisma } from "@/prisma/prisma";
import {
  buildHourlyChart,
  buildWeekdayChart,
  comparePeriods,
  dayRange,
  weekRange,
  sumValues,
  getJalaliMonthlyTrend,
  jalaliMonthRangeFor,
  daysInJalaliMonth,
  mapRowsToJalaliDays,
} from "@/src/shared/utils/analytics";

export async function getPaymentsCharts(
  summary: {
    successfulPayments: number;
    failedPayments: number;
    pendingPayments: number;
    unspecifiedPayments: number;
    cashPayments: number;
    onlinePayments: number;
  },
  report: {
    biggestPayments: {
      id: number;
      amount: number;
    }[];
  },
  // ✅ جدید — فقط وقتی پاس داده بشه incomeByDay محاسبه می‌شه (مثل الگوی products)
  jalaaliMonth?: { jy: number; jm: number },
) {
  const today = dayRange(0);
  const yesterday = dayRange(1);
  const thisWeek = weekRange(0);
  const lastWeek = weekRange(1);

  const [
    paymentsLast30Days,
    incomeLast30Days,
    monthlyIncome,
    monthlyPayments,
    thisWeekIncomeByDow,
    lastWeekIncomeByDow,
    todayIncomeByHour,
    yesterdayIncomeByHour,
  ] = await Promise.all([
    prisma.$queryRaw<{ date: string; count: number }[]>`
      SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS count
      FROM payments
      WHERE created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

    prisma.$queryRaw<{ date: string; income: number }[]>`
      SELECT
        DATE(created_at) AS date,
        SUM(amount)::int AS income
      FROM payments
      WHERE status = 1
        AND created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

    // ✅ روند ۱۲ ماه اخیر بر اساس ماه‌های *جلالی* واقعی (قبلاً TO_CHAR میلادی بود)
    getJalaliMonthlyTrend(12, ({ start, end }) =>
      prisma.payments
        .aggregate({
          where: { status: 1, created_at: { gte: start, lt: end } },
          _sum: { amount: true },
        })
        .then((r) => r._sum.amount ?? 0),
    ),

    getJalaliMonthlyTrend(12, ({ start, end }) =>
      prisma.payments.count({
        where: { created_at: { gte: start, lt: end } },
      }),
    ),

    // ✅ درآمد ۷ روز اخیر به تفکیک روز هفته — EXTRACT با تایم‌زون تهران
    prisma.$queryRaw<{ dow: number; value: number }[]>`
      SELECT
        EXTRACT(DOW FROM created_at AT TIME ZONE 'Asia/Tehran')::int AS dow,
        SUM(amount)::int AS value
      FROM payments
      WHERE status = 1
        AND created_at >= ${thisWeek.start} AND created_at < ${thisWeek.end}
      GROUP BY dow;
    `,

    prisma.$queryRaw<{ dow: number; value: number }[]>`
      SELECT
        EXTRACT(DOW FROM created_at AT TIME ZONE 'Asia/Tehran')::int AS dow,
        SUM(amount)::int AS value
      FROM payments
      WHERE status = 1
        AND created_at >= ${lastWeek.start} AND created_at < ${lastWeek.end}
      GROUP BY dow;
    `,

    // ✅ درآمد امروز به تفکیک ساعت — قبلاً بدون تایم‌زون بود، ساعت‌ها اشتباه می‌افتادن
    prisma.$queryRaw<{ hour: number; value: number }[]>`
      SELECT
        EXTRACT(HOUR FROM created_at AT TIME ZONE 'Asia/Tehran')::int AS hour,
        SUM(amount)::int AS value
      FROM payments
      WHERE status = 1
        AND created_at >= ${today.start} AND created_at < ${today.end}
      GROUP BY hour;
    `,

    prisma.$queryRaw<{ hour: number; value: number }[]>`
      SELECT
        EXTRACT(HOUR FROM created_at AT TIME ZONE 'Asia/Tehran')::int AS hour,
        SUM(amount)::int AS value
      FROM payments
      WHERE status = 1
        AND created_at >= ${yesterday.start} AND created_at < ${yesterday.end}
      GROUP BY hour;
    `,
  ]);

  // نمودار میله‌ای هفتگی (شنبه..جمعه) + رشد نسبت به هفته قبل
  const weeklyIncomeChart = buildWeekdayChart(thisWeekIncomeByDow);
  const weeklyIncomeGrowth = comparePeriods(
    sumValues(thisWeekIncomeByDow),
    sumValues(lastWeekIncomeByDow),
  ).growth;

  // نمودار میله‌ای روزانه (بازه‌های ۴ ساعته) + رشد نسبت به دیروز
  const dailyIncomeChart = buildHourlyChart(todayIncomeByHour);
  const dailyIncomeGrowth = comparePeriods(
    sumValues(todayIncomeByHour),
    sumValues(yesterdayIncomeByHour),
  ).growth;

  // ✅ جدید — درآمد روزهای یک ماه شمسی مشخص، برای LineChart
  // (رفع باگ: چون incomeLast30Days یه بازه‌ی غلتان ۳۰ روزه‌ست، با عوض کردن
  // سلکتور ماه توی UI تغییر نمی‌کرد؛ این فیلد بر اساس year/month واقعی ساخته میشه)
  let incomeByDay: { day: number; value: number }[] | null = null;
  let daysInMonth: number | null = null;

  if (jalaaliMonth) {
    const { jy, jm } = jalaaliMonth;
    const { start, end } = jalaliMonthRangeFor(jy, jm);
    daysInMonth = daysInJalaliMonth(jy, jm);

    const rows = await prisma.$queryRaw<{ date: string; income: number }[]>`
      SELECT
        DATE(created_at) AS date,
        SUM(amount)::int AS income
      FROM payments
      WHERE status = 1
        AND created_at >= ${start} AND created_at < ${end}
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `;

    incomeByDay = mapRowsToJalaliDays(
      rows.map((r) => ({ date: r.date, count: r.income })),
      daysInMonth,
    );
  }

  return {
    paymentsLast30Days,

    incomeLast30Days,

    paymentStatusChart: [
      { name: "موفق", value: summary.successfulPayments },
      { name: "ناموفق", value: summary.failedPayments },
      { name: "در انتظار", value: summary.pendingPayments },
      { name: "نامشخص ", value: summary.unspecifiedPayments },
    ],

    paymentMethodChart: [
      { name: "آنلاین", value: summary.onlinePayments },
      { name: "نقدی", value: summary.cashPayments },
    ],

    monthlyIncome,

    monthlyPayments,

    biggestPaymentsChart: report.biggestPayments.map((payment) => ({
      name: `#${payment.id}`,
      amount: payment.amount,
    })),

    weeklyIncomeChart,
    weeklyIncomeGrowth,

    dailyIncomeChart,
    dailyIncomeGrowth,

    // ✅ جدید
    incomeByDay,
    daysInMonth,
  };
}
/**
 * دریافت داده‌های نمودارهای داشبورد پرداخت‌ها
 *
 * خروجی:
 * - paymentsLast30Days: تعداد پرداخت‌های ثبت شده در ۳۰ روز اخیر
 * - incomeLast30Days: درآمد روزانه ۳۰ روز اخیر از پرداخت‌های موفق (بازه‌ی غلتان تقویمی)
 * - paymentStatusChart: توزیع وضعیت پرداخت‌ها (موفق، ناموفق، در انتظار)
 * - paymentMethodChart: توزیع روش‌های پرداخت (آنلاین، نقدی)
 * - monthlyIncome: درآمد ۱۲ ماه اخیر، بر اساس ماه‌های *جلالی* واقعی
 * - monthlyPayments: تعداد پرداخت‌ها در هر ماه جلالی
 * - biggestPaymentsChart: ۱۰ پرداخت با بیشترین مبلغ
 * - weeklyIncomeChart: درآمد ۷ روز اخیر به تفکیک روز هفته (شنبه..جمعه، تایم‌زون تهران)
 * - weeklyIncomeGrowth: درصد رشد درآمد هفته جاری نسبت به هفته قبل
 * - dailyIncomeChart: درآمد امروز به تفکیک بازه‌های ۴ ساعته (تایم‌زون تهران)
 * - dailyIncomeGrowth: درصد رشد درآمد امروز نسبت به دیروز
 * - incomeByDay: درآمد روز‌به‌روزِ یک ماه شمسیِ مشخص (فقط اگه jalaaliMonth پاس داده بشه)
 * - daysInMonth: طول همون ماه شمسی
 */