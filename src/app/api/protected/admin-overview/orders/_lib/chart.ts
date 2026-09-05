import { prisma } from "@/prisma/prisma";
import { buildHourlyChart, buildWeekdayChart, comparePeriods, dayRange, getJalaliMonthlyTrend, sumValues, weekRange } from "@/src/shared/utils/analytics";


export async function getOrdersCharts(
  summary: {
    pendingOrders: number;
    confirmedOrders: number;
    preparingOrders: number;
    readyToShipOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    returnedOrders: number;
    paidOrders: number;
    unpaidOrders: number;
    // ✅ جدید
    failedPaymentOrders: number;
    unspecifiedPaymentOrders: number;
  },
  report: {
    topCustomers: {
      name: string | null;
      phone: string | null;
      _count: { orders: number };
    }[];
  },
) {
  const today = dayRange(0);
  const yesterday = dayRange(1);
  const thisWeek = weekRange(0);
  const lastWeek = weekRange(1);

  const [
    ordersLast30Days,
    revenueLast30Days,
    monthlyRevenue,
    monthlyOrders,
    todayRevenueByHour,
    yesterdayRevenueByHour,
    thisWeekRevenueByDay,
    lastWeekRevenueByDay,
  ] = await Promise.all([
    prisma.$queryRaw<{ date: string; count: number }[]>`
      SELECT DATE(created_at) AS date, COUNT(*)::int AS count
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

    prisma.$queryRaw<{ date: string; revenue: number }[]>`
      SELECT DATE(created_at) AS date, SUM(total_price)::int AS revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '30 day' AND payment_status = 1
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

    // ✅ روند ۱۲ ماه اخیر بر اساس ماه‌های *جلالی* (نه میلادی)
    getJalaliMonthlyTrend(12, ({ start, end }) =>
      prisma.orders
        .aggregate({
          where: { payment_status: 1, created_at: { gte: start, lt: end } },
          _sum: { total_price: true },
        })
        .then((r: { _sum: { total_price: number | null } }) => r._sum.total_price ?? 0),
    ),

    getJalaliMonthlyTrend(12, ({ start, end }) =>
      prisma.orders
        .count({ where: { created_at: { gte: start, lt: end } } }),
    ),

    // ✅ درآمد امروز به تفکیک ساعت
    prisma.$queryRaw<{ hour: number; value: number }[]>`
      SELECT EXTRACT(HOUR FROM created_at)::int AS hour, SUM(total_price)::int AS value
      FROM orders
      WHERE payment_status = 1
        AND created_at >= ${today.start} AND created_at < ${today.end}
      GROUP BY hour;
    `,

    // ✅ درآمد دیروز به تفکیک ساعت (برای مقایسه)
    prisma.$queryRaw<{ hour: number; value: number }[]>`
      SELECT EXTRACT(HOUR FROM created_at)::int AS hour, SUM(total_price)::int AS value
      FROM orders
      WHERE payment_status = 1
        AND created_at >= ${yesterday.start} AND created_at < ${yesterday.end}
      GROUP BY hour;
    `,

    // ✅ درآمد ۷ روز اخیر به تفکیک روز هفته
    prisma.$queryRaw<{ dow: number; value: number }[]>`
      SELECT EXTRACT(DOW FROM created_at)::int AS dow, SUM(total_price)::int AS value
      FROM orders
      WHERE payment_status = 1
        AND created_at >= ${thisWeek.start} AND created_at < ${thisWeek.end}
      GROUP BY dow;
    `,

    // ✅ درآمد هفته‌ی قبل به تفکیک روز هفته (برای مقایسه رشد)
    prisma.$queryRaw<{ dow: number; value: number }[]>`
      SELECT EXTRACT(DOW FROM created_at)::int AS dow, SUM(total_price)::int AS value
      FROM orders
      WHERE payment_status = 1
        AND created_at >= ${lastWeek.start} AND created_at < ${lastWeek.end}
      GROUP BY dow;
    `,
  ]);

  const dailyRevenueChart = buildHourlyChart(todayRevenueByHour);
  const dailyRevenueComparison = comparePeriods(
    sumValues(todayRevenueByHour),
    sumValues(yesterdayRevenueByHour),
  );

  const weeklyRevenueChart = buildWeekdayChart(thisWeekRevenueByDay);
  const weeklyRevenueComparison = comparePeriods(
    sumValues(thisWeekRevenueByDay),
    sumValues(lastWeekRevenueByDay),
  );

  return {
    ordersLast30Days,
    revenueLast30Days,

    orderStatusChart: [
      { name: "منتظر تایید", value: summary.pendingOrders },
      { name: "تایید اولیه", value: summary.confirmedOrders },
      { name: "درحال آماده سازی", value: summary.preparingOrders },
      { name: "آماده ارسال", value: summary.readyToShipOrders },
      { name: "تحویل به پست", value: summary.shippedOrders },
      { name: "تحویل به مشتری", value: summary.deliveredOrders },
      { name: "مرجوع شده", value: summary.returnedOrders },
    ],

    // ✅ قبلاً فقط ۲ حالت (پرداخت‌شده/پرداخت‌نشده) داشت؛ payment_status واقعاً
    // ۴ مقداره (۰=در انتظار، ۱=موفق، ۲=ناموفق، ۳=نامشخص) و باید هر ۴ تا نشون داده بشن
    paymentStatusChart: [
      { name: "موفق", value: summary.paidOrders },
      { name: "ناموفق", value: summary.failedPaymentOrders },
      { name: "در انتظار", value: summary.unpaidOrders },
      { name: "نامشخص", value: summary.unspecifiedPaymentOrders },
    ],

    monthlyRevenue,
    monthlyOrders,

    // ✅ نمودار روزانه (بازه‌های ۴ ساعته) + درصد رشد نسبت به دیروز
    dailyRevenueChart,
    dailyRevenueGrowth: dailyRevenueComparison.growth,

    // ✅ نمودار هفتگی (شنبه..جمعه) + درصد رشد نسبت به هفته قبل
    weeklyRevenueChart,
    weeklyRevenueGrowth: weeklyRevenueComparison.growth,

    topCustomersChart: report.topCustomers.map((user) => ({
      name: user.name ?? user.phone ?? "بدون نام",
      orders: user._count.orders,
    })),
  };
}