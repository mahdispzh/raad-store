import { prisma } from "@/prisma/prisma";
import { jalaliMonthRange } from "@/src/shared/utils/analytics";

// درصد رشد/افت نسبت به دوره‌ی قبل (الگو مطابق users/_lib/summary.ts)
function calcGrowthPercent(current: number, previous: number): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
}

export async function getBlogsSummary() {
  // ✅ بازه‌ی ماه شمسی جاری و ماه قبل، برای محاسبه‌ی درصد رشد
  const { start: thisMonthStart } = jalaliMonthRange(0);
  const { start: lastMonthStart } = jalaliMonthRange(1);

  const [
    totalBlogs,

    // ⚠️ هر ۴ وضعیت به‌جای فقط ۲ تا (0: پیش‌نویس, 1: منتشر شده,
    // 2: زمان‌بندی شده, 3: منتشر نشده) — عددهای status رو با ENUM/مقادیر
    // واقعی پروژه‌تون چک کنید، همینایی که قبلاً گفتید رو فرض کردم.
    draftBlogs,
    publishedBlogs,
    scheduledBlogs,
    unpublishedBlogs,

    totalViews,
    totalLikes,
    totalComments,

    blogsToday,

    // ✅ برای محاسبه‌ی درصد رشد ماهانه
    blogsThisMonth,
    blogsLastMonth,

    averageViews,
    averageLikes,
  ] = await Promise.all([
    prisma.blogs.count(),

    prisma.blogs.count({ where: { status: 0 } }),
    prisma.blogs.count({ where: { status: 1 } }),
    prisma.blogs.count({ where: { status: 2 } }),
    prisma.blogs.count({ where: { status: 3 } }),

    prisma.blogs.aggregate({ _sum: { view: true } }),
    prisma.blogs.aggregate({ _sum: { likes: true } }),
    prisma.blogs.aggregate({ _sum: { comments: true } }),

    prisma.blogs.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    prisma.blogs.count({
      where: {
        created_at: { gte: thisMonthStart },
      },
    }),

    prisma.blogs.count({
      where: {
        created_at: { gte: lastMonthStart, lt: thisMonthStart },
      },
    }),

    prisma.blogs.aggregate({ _avg: { view: true } }),
    prisma.blogs.aggregate({ _avg: { likes: true } }),
  ]);

  return {
    totalBlogs,

    publishedBlogs,
    draftBlogs,
    scheduledBlogs,
    unpublishedBlogs,

    totalViews: totalViews._sum.view ?? 0,
    totalLikes: totalLikes._sum.likes ?? 0,
    totalComments: totalComments._sum.comments ?? 0,

    blogsToday,
    blogsThisMonth,

    averageViews: Math.round(averageViews._avg.view ?? 0),
    averageLikes: Math.round(averageLikes._avg.likes ?? 0),

    // ✅ درصد رشد بلاگ‌های این ماه نسبت به ماه قبل
    monthGrowthPercent: calcGrowthPercent(blogsThisMonth, blogsLastMonth),
  };
}

/**
 * دریافت خلاصه آماری وبلاگ‌ها
 *
 * خروجی:
 * - totalBlogs: تعداد کل وبلاگ‌ها
 * - publishedBlogs: تعداد وبلاگ‌های منتشرشده (status: 1)
 * - draftBlogs: تعداد پیش‌نویس‌ها (status: 0)
 * - scheduledBlogs: تعداد وبلاگ‌های زمان‌بندی‌شده (status: 2)
 * - unpublishedBlogs: تعداد وبلاگ‌های منتشرنشده (status: 3)
 * - totalViews: مجموع بازدید تمام وبلاگ‌ها
 * - totalLikes: مجموع لایک‌ها
 * - totalComments: مجموع کامنت‌ها
 * - blogsToday: تعداد وبلاگ‌های ایجاد شده امروز
 * - blogsThisMonth: تعداد وبلاگ‌های ایجاد شده در ماه جاری
 * - averageViews: میانگین بازدید هر وبلاگ
 * - averageLikes: میانگین لایک هر وبلاگ
 * - monthGrowthPercent: درصد رشد/افت بلاگ‌های این ماه نسبت به ماه قبل
 */