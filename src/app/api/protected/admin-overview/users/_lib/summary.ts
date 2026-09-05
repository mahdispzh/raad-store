import { prisma } from "@/prisma/prisma";
import { jalaliMonthRange } from "@/src/shared/utils/analytics";

// درصد رشد/افت نسبت به دوره‌ی قبل. اگه دوره‌ی قبل صفر بود (تا الان هیچی
// نبوده)، برای جلوگیری از تقسیم بر صفر: صفر به صفر = بدون رشد، هرچیز
// دیگه به صفر = رشد ۱۰۰٪ در نظر گرفته می‌شه.
function calcGrowthPercent(current: number, previous: number): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
}

export async function getUserSummary() {
  const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
  const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // ✅ بازه‌ی ماه‌های جلالی (نه میلادی) — monthsAgo=0 یعنی ماه شمسی جاری،
  // monthsAgo=1 یعنی ماه شمسی قبل. jalaliMonthRange طول واقعی ماه (۲۹/۳۰/۳۱)
  // و کبیسه رو خودش لحاظ می‌کنه. پایان ماه قبل == شروع ماه جاری، پس
  // thisMonthStart برای هر دو مرز کافیه.
  const { start: thisMonthStart } = jalaliMonthRange(0);
  const { start: lastMonthStart } = jalaliMonthRange(1);

  const [
    totalUsers,
    todayUsers,
    lastMonthUsers,
    yesterdayUsers,
    thisWeekUsers,
    thisMonthUsers,

    totalAdmins,
    totalCustomers,

    usersWithOrders,
    usersWithoutOrdersCount,

    usersWithAddress,
    usersWithoutAddressCount,

    usersWithRecentlyViewed,
    usersWithRecentlySearch,

    // ✅ برای درصد رشد «کاربران دارای سفارش»: سفارش‌های ثبت‌شده این ماه / ماه قبل
    ordersThisMonth,
    ordersLastMonth,

    // ✅ برای درصد رشد «کاربران دارای آدرس»: آدرس‌های ثبت‌شده این ماه / ماه قبل
    addressesThisMonth,
    addressesLastMonth,
  ] = await Promise.all([
    prisma.users.count(),

    prisma.users.count({
      where: {
        created_at: {
          gte: todayStart,
        },
      },
    }),

    // ⚠️ این کوئری قبلاً به اسم «yesterdayUsers» دیستراکچر می‌شد ولی درواقع
    // بازه‌ی «ماه قبل» رو می‌گرفت — چون آرایه‌ی دیستراکچرینگ یه اسم کمتر از
    // تعداد کوئری‌ها داشت، همه‌ی متغیرهای بعدی یکی جابه‌جا شده بودن.
    prisma.users.count({
      where: {
        created_at: {
          gte: lastMonthStart,
          lt: thisMonthStart,
        },
      },
    }),

    prisma.users.count({
      where: {
        created_at: {
          gte: yesterdayStart,
          lt: todayStart,
        },
      },
    }),

    prisma.users.count({
      where: {
        created_at: {
          gte: sevenDaysAgo,
        },
      },
    }),

    prisma.users.count({
      where: {
        created_at: {
          gte: thisMonthStart,
        },
      },
    }),

    prisma.users.count({
      where: {
        role: 2,
      },
    }),

    prisma.users.count({
      where: {
        role: 1,
      },
    }),

    prisma.users.count({
      where: {
        orders: {
          some: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        orders: {
          none: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        user_addresses: {
          some: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        user_addresses: {
          none: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        recently_viewed: {
          isEmpty: false,
        },
      },
    }),

    prisma.users.count({
      where: {
        recently_search: {
          isEmpty: false,
        },
      },
    }),

    prisma.orders.count({
      where: {
        created_at: {
          gte: thisMonthStart,
        },
      },
    }),

    prisma.orders.count({
      where: {
        created_at: {
          gte: lastMonthStart,
          lt: thisMonthStart,
        },
      },
    }),

    prisma.user_addresses.count({
      where: {
        created_at: {
          gte: thisMonthStart,
        },
      },
    }),

    prisma.user_addresses.count({
      where: {
        created_at: {
          gte: lastMonthStart,
          lt: thisMonthStart,
        },
      },
    }),
  ]);

  return {
    totalUsers,
    todayUsers,
    yesterdayUsers,
    thisWeekUsers,
    thisMonthUsers,
    lastMonthUsers,

    totalAdmins,
    totalCustomers,

    usersWithOrders,
    usersWithoutOrdersCount,

    usersWithAddress,
    usersWithoutAddressCount,

    usersWithRecentlyViewed,
    usersWithRecentlySearch,

    // درصد رشد/افت هر متریک نسبت به دوره‌ی قبلِ مخصوص خودش:
    // - todayGrowthPercent: امروز نسبت به دیروز
    // - monthGrowthPercent: این ماه نسبت به ماه قبل (بر اساس تاریخ ثبت‌نام کاربر)
    // - ordersGrowthPercent: سفارش‌های این ماه نسبت به ماه قبل
    // - addressGrowthPercent: آدرس‌های ثبت‌شده این ماه نسبت به ماه قبل
    todayGrowthPercent: calcGrowthPercent(todayUsers, yesterdayUsers),
    monthGrowthPercent: calcGrowthPercent(thisMonthUsers, lastMonthUsers),
    ordersGrowthPercent: calcGrowthPercent(ordersThisMonth, ordersLastMonth),
    addressGrowthPercent: calcGrowthPercent(
      addressesThisMonth,
      addressesLastMonth,
    ),
  };
}

/**
 * خروجی خلاصه کاربران
 *
 * totalUsers
 * تعداد کل کاربران
 *
 * todayUsers
 * تعداد کاربران ثبت‌نام شده امروز
 *
 * yesterdayUsers
 * تعداد کاربران ثبت‌نام شده دیروز
 *
 * thisWeekUsers
 * تعداد کاربران ثبت‌نام شده در ۷ روز اخیر
 *
 * thisMonthUsers
 * تعداد کاربران ثبت‌نام شده در ماه جاری
 *
 * lastMonthUsers
 * تعداد کاربران ثبت‌نام شده در ماه قبل
 *
 * totalAdmins
 * تعداد ادمین‌ها
 *
 * totalCustomers
 * تعداد مشتریان
 *
 * usersWithOrders
 * تعداد کاربران دارای سفارش
 *
 * usersWithoutOrdersCount
 * تعداد کاربران بدون سفارش
 *
 * usersWithAddress
 * تعداد کاربران دارای آدرس
 *
 * usersWithoutAddressCount
 * تعداد کاربران بدون آدرس
 *
 * usersWithRecentlyViewed
 * تعداد کاربران دارای تاریخچه بازدید
 *
 * usersWithRecentlySearch
 * تعداد کاربران دارای تاریخچه جستجو
 *
 * todayGrowthPercent / monthGrowthPercent / ordersGrowthPercent / addressGrowthPercent
 * درصد رشد یا افت هر متریک نسبت به دوره‌ی قبل از خودش
 */