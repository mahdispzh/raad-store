import { lastNJalaliMonths, jalaliMonthLabel, type DateRange } from "./jalali";

/**
 * روند ماهانه‌ی جلالی برای n ماه اخیر.
 * به‌جای GROUP BY روی TO_CHAR(created_at,'YYYY-MM') (که ماه‌ها رو میلادی
 * حساب می‌کنه)، برای هر ماهِ *جلالی* یک کوئری با بازه‌ی دقیق start/end اجرا
 * می‌شه. fetchForRange رو خود هر ماژول (orders/payments/users/...) پاس
 * می‌ده، چون فیلد و جدول متفاوته؛ اما محاسبه‌ی بازه‌ی ماه یک‌جا انجام می‌شه.
 *
 * مثال استفاده در orders/_lib/chart.ts:
 *
 *   const monthlyRevenue = await getJalaliMonthlyTrend(12, ({ start, end }) =>
 *     prisma.orders
 *       .aggregate({
 *         where: { payment_status: 1, created_at: { gte: start, lt: end } },
 *         _sum: { total_price: true },
 *       })
 *       .then((r) => r._sum.total_price ?? 0),
 *   );
 */
export async function getJalaliMonthlyTrend(
  months: number,
  fetchForRange: (range: DateRange) => Promise<number>,
) {
  const ranges = lastNJalaliMonths(months);

  return Promise.all(
    ranges.map(async (range) => ({
      month: jalaliMonthLabel(range),
      value: await fetchForRange(range),
    })),
  );
}
