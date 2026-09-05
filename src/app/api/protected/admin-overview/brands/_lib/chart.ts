import { prisma } from "@/prisma/prisma";

export async function getBrandsCharts(
  summary: {
    brandsWithProducts: number;
    emptyBrands: number;
  },
  report: {
    topBrands: {
      name: string;
      _count: {
        products: number;
      };
    }[];

    brandsMostViewedProducts: {
      name: string;
      products: {
        views: number | null;
      }[];
    }[];
  },
) {
  const [brandsLast30Days, monthlyBrands] = await Promise.all([
    prisma.$queryRaw<
      {
        date: string;
        count: number;
      }[]
    >`
      SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS count
      FROM brands
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
      FROM brands
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `,
  ]);

  return {
    brandsLast30Days,

    monthlyBrands,

    topBrandsChart: report.topBrands.map((brand) => ({
      name: brand.name,
      products: brand._count.products,
    })),

    brandDistributionChart: [
      {
        name: "دارای محصول",
        value: summary.brandsWithProducts,
      },
      {
        name: "بدون محصول",
        value: summary.emptyBrands,
      },
    ],

    topViewedBrandChart: report.brandsMostViewedProducts.map((brand) => ({
      name: brand.name,
      views: brand.products.reduce(
        (sum, product) => sum + (product.views ?? 0),
        0,
      ),
    })),
  };
}
/**
 * دریافت داده‌های نمودارهای داشبورد برندها
 *
 * خروجی:
 * - brandsLast30Days: تعداد برندهای ایجاد شده در ۳۰ روز اخیر
 * - monthlyBrands: تعداد برندهای ایجاد شده به تفکیک ۱۲ ماه اخیر
 * - topBrandsChart: ۱۰ برند با بیشترین تعداد محصول
 * - brandDistributionChart: نسبت برندهای دارای محصول و بدون محصول
 * - topViewedBrandChart: ۱۰ برند با بیشترین مجموع بازدید محصولات
 */
