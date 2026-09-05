import { prisma } from "@/prisma/prisma";

interface SummaryData {
  defaultAddresses: number;
  customAddresses: number;
  usersWithAddress: number;
  usersWithoutAddress: number;
}

interface ReportData {
  provinces: {
    province: string | null;
    _count: number;
  }[];
  cities: {
    city: string | null;
    _count: number;
  }[];
  usersWithMostAddresses: {
    id: number;
    name: string | null;
    phone: string | null;
    _count: {
      user_addresses: number;
    };
  }[];
}

export async function getAddressCharts(
  summary: SummaryData,
  report: ReportData,
) {
  const [addressesLast30Days, monthlyAddresses] = await Promise.all([
    prisma.$queryRaw<
      {
        date: string;
        count: number;
      }[]
    >`
      SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS count
      FROM user_addresses
      WHERE created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

    prisma.$queryRaw<
      {
        month: string;
        count: number;
      }[]
    >`
      SELECT
        TO_CHAR(created_at,'YYYY-MM') AS month,
        COUNT(*)::int AS count
      FROM user_addresses
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `,
  ]);

  return {
    addressesLast30Days,

    monthlyAddresses,

    defaultAddressChart: [
      {
        name: "پیشفرض",
        value: summary.defaultAddresses,
      },
      {
        name: "سایر",
        value: summary.customAddresses,
      },
    ],

    usersAddressChart: [
      {
        name: "دارای آدرس",
        value: summary.usersWithAddress,
      },
      {
        name: "بدون آدرس",
        value: summary.usersWithoutAddress,
      },
    ],

    provinceChart: report.provinces.map((item) => ({
      name: item.province,
      value: item._count,
    })),

    cityChart: report.cities.map((item) => ({
      name: item.city,
      value: item._count,
    })),

    topUsersChart: report.usersWithMostAddresses.map((user) => ({
      name: user.name ?? user.phone ?? `User ${user.id}`,
      addresses: user._count.user_addresses,
    })),
  };
}
/**
 * داده‌های مورد نیاز نمودارهای داشبورد
 *
 * خروجی:
 * - addressesLast30Days: تعداد آدرس‌های ثبت‌شده در ۳۰ روز اخیر
 * - monthlyAddresses: تعداد آدرس‌ها به تفکیک ۱۲ ماه اخیر
 * - defaultAddressChart: نسبت آدرس‌های پیش‌فرض و سایر
 * - usersAddressChart: نسبت کاربران دارای آدرس و بدون آدرس
 * - provinceChart: تعداد آدرس‌ها به تفکیک استان
 * - cityChart: تعداد آدرس‌ها به تفکیک شهر
 * - topUsersChart: کاربران با بیشترین تعداد آدرس
 */
