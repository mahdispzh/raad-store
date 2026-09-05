import { prisma } from "@/prisma/prisma";

/**
 * دریافت داده‌های نمودارهای داشبورد دسته‌بندی‌ها
 *
 * خروجی:
 * - categoriesLast30Days: تعداد دسته‌بندی‌های ایجاد شده در ۳۰ روز اخیر
 * - monthlyCategories: تعداد دسته‌بندی‌های ایجاد شده به تفکیک ۱۲ ماه اخیر
 * - topCategoriesChart: ۱۰ دسته‌بندی با بیشترین تعداد محصول
 * - categoryDistributionChart: نسبت دسته‌بندی‌های دارای محصول و بدون محصول
 * - parentChildChart: نسبت دسته‌بندی‌های اصلی و فرعی
 */
export async function getCategoriesCharts(
  summary: {
    categoriesWithProducts: number;
    emptyCategories: number;
    rootCategories: number;
    childCategories: number;
  },
  report: {
    largestCategories: {
      name: string;
      _count: {
        products: number;
      };
    }[];
  },
) {
  const [categoriesLast30Days, monthlyCategories] = await Promise.all([
    prisma.$queryRaw<
      {
        date: string;
        count: number;
      }[]
    >`
      SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS count
      FROM categories
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
      FROM categories
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `,
  ]);

  return {
    categoriesLast30Days,

    monthlyCategories,

    topCategoriesChart: report.largestCategories.map((category) => ({
      name: category.name,
      products: category._count.products,
    })),

    categoryDistributionChart: [
      {
        name: "دارای محصول",
        value: summary.categoriesWithProducts,
      },
      {
        name: "بدون محصول",
        value: summary.emptyCategories,
      },
    ],

    parentChildChart: [
      {
        name: "اصلی",
        value: summary.rootCategories,
      },
      {
        name: "فرعی",
        value: summary.childCategories,
      },
    ],
  };
}
