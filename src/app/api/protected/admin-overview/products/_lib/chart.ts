/* eslint-disable @typescript-eslint/no-explicit-any */
// _lib/chart.ts

import { prisma } from "@/prisma/prisma";

export async function getProductsCharts({ summary, report }: any) {
  const [productsLast30Days] = await Promise.all([
    prisma.$queryRaw<
      {
        date: string;
        count: number;
      }[]
    >`
      SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS count
      FROM products
      WHERE created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,
  ]);

  return {
    productsLast30Days,

    productsByCategory: report.productsByCategory,

    productsByBrand: report.productsByBrand,

    stockDistribution: [
      {
        name: "ناموجود",
        value: summary.outOfStockVariants,
      },
      {
        name: "کم موجود",
        value: summary.lowStockVariants,
      },
      {
        name: "بحرانی",
        value: summary.criticalStockVariants,
      },
      {
        name: "موجود",
        value:
          summary.totalVariants -
          summary.outOfStockVariants -
          summary.lowStockVariants,
      },
    ],

    discountDistribution: [
      {
        name: "دارای تخفیف",
        value: summary.discountedProducts,
      },
      {
        name: "بدون تخفیف",
        value: summary.noDiscountProducts,
      },
    ],

    topSellingChart: report.topSellingProducts.map((item: any) => ({
      name: item.name,
      sold: item.sold_count ?? 0,
    })),

    topViewedChart: report.topViewedProducts.map((item: any) => ({
      name: item.name,
      views: item.views ?? 0,
    })),

    topLikedChart: report.topLikedProducts.map((item: any) => ({
      name: item.name,
      likes: item._count.likes,
    })),
  };
}
/**
 * خروجی نمودارهای محصولات
 *
 * productsLast30Days
 * تعداد محصولات ایجاد شده در ۳۰ روز اخیر
 *
 * productsByCategory
 * تعداد محصولات هر دسته‌بندی
 *
 * productsByBrand
 * تعداد محصولات هر برند
 *
 * stockDistribution
 * توزیع موجودی انبار
 *
 * discountDistribution
 * توزیع محصولات دارای تخفیف و بدون تخفیف
 *
 * topSellingChart
 * ۱۰ محصول پرفروش
 *
 * topViewedChart
 * ۱۰ محصول پربازدید
 *
 * topLikedChart
 * ۱۰ محصول پرلایک
 */
