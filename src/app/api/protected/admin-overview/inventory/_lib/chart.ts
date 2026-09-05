import { prisma } from "@/prisma/prisma";

/**
 * دریافت داده‌های نمودارهای داشبورد تنوع‌های محصولات
 *
 * خروجی:
 * - variantsLast30Days: تعداد تنوع‌های ایجاد شده در ۳۰ روز اخیر
 * - stockDistributionChart: توزیع وضعیت موجودی (ناموجود، بحرانی، کم موجود، موجود)
 * - topStockChart: ۱۰ تنوع با بیشترین موجودی
 * - lowestStockChart: ۱۰ تنوع با کمترین موجودی
 * - stockByColor: تعداد تنوع‌ها به تفکیک رنگ
 * - stockBySize: تعداد تنوع‌ها به تفکیک سایز
 */
export async function getProductVariantsCharts(
  summary: {
    outOfStock: number;
    criticalStock: number;
    lowStock: number;
    normalStock: number;
  },
  report: {
    highestStockProducts: {
      stock: number;
      products: {
        name: string;
      };
    }[];

    lowestStockVariants: {
      stock: number;
      products: {
        name: string;
      };
    }[];
  },
) {
  const [variantsLast30Days, stockByColor, stockBySize] = await Promise.all([
    prisma.$queryRaw<
      {
        date: string;
        count: number;
      }[]
    >`
        SELECT
          DATE(created_at) AS date,
          COUNT(*)::int AS count
        FROM product_variants
        WHERE created_at >= NOW() - INTERVAL '30 day'
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at);
      `,

    prisma.colors.findMany({
      select: {
        name: true,
        _count: {
          select: {
            product_variants: true,
          },
        },
      },
    }),

    prisma.sizes.findMany({
      select: {
        name: true,
        _count: {
          select: {
            product_variants: true,
          },
        },
      },
    }),
  ]);

  return {
    variantsLast30Days,

    stockDistributionChart: [
      {
        name: "ناموجود",
        value: summary.outOfStock,
      },
      {
        name: "بحرانی",
        value: summary.criticalStock,
      },
      {
        name: "کم موجود",
        value: summary.lowStock,
      },
      {
        name: "موجود",
        value: summary.normalStock,
      },
    ],

    topStockChart: report.highestStockProducts.map((item) => ({
      name: item.products.name,
      stock: item.stock,
    })),

    lowestStockChart: report.lowestStockVariants.map((item) => ({
      name: item.products.name,
      stock: item.stock,
    })),

    stockByColor: stockByColor.map((color) => ({
      name: color.name,
      variants: color._count.product_variants,
    })),

    stockBySize: stockBySize.map((size) => ({
      name: size.name,
      variants: size._count.product_variants,
    })),
  };
}
