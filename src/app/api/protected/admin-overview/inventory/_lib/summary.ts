import { prisma } from "@/prisma/prisma";

export async function getProductVariantsSummary() {
  const [
    totalVariants,

    totalStock,

    outOfStock,

    criticalStock,

    lowStock,

    normalStock,

    averageStock,

    uniqueProducts,

    uniqueColors,

    uniqueSizes,
  ] = await Promise.all([
    prisma.product_variants.count(),

    prisma.product_variants.aggregate({
      _sum: {
        stock: true,
      },
    }),

    prisma.product_variants.count({
      where: {
        stock: 0,
      },
    }),

    prisma.product_variants.count({
      where: {
        stock: {
          gt: 0,
          lte: 2,
        },
      },
    }),

    prisma.product_variants.count({
      where: {
        stock: {
          gt: 2,
          lte: 5,
        },
      },
    }),

    prisma.product_variants.count({
      where: {
        stock: {
          gt: 5,
        },
      },
    }),

    prisma.product_variants.aggregate({
      _avg: {
        stock: true,
      },
    }),

    prisma.products.count(),

    prisma.colors.count(),

    prisma.sizes.count(),
  ]);

  return {
    totalVariants,

    totalStock: totalStock._sum.stock ?? 0,

    outOfStock,

    criticalStock,

    lowStock,

    normalStock,

    averageStock: Math.round(averageStock._avg.stock ?? 0),

    uniqueProducts,

    uniqueColors,

    uniqueSizes,
  };
}
/**
 * دریافت خلاصه آماری تنوع‌های محصولات (Product Variants)
 *
 * خروجی:
 * - totalVariants: تعداد کل تنوع‌های محصولات
 * - totalStock: مجموع موجودی تمام تنوع‌ها
 * - outOfStock: تعداد تنوع‌های ناموجود
 * - criticalStock: تعداد تنوع‌های با موجودی بحرانی (۱ تا ۲)
 * - lowStock: تعداد تنوع‌های با موجودی کم (۳ تا ۵)
 * - normalStock: تعداد تنوع‌های با موجودی عادی (بیش از ۵)
 * - averageStock: میانگین موجودی هر تنوع
 * - uniqueProducts: تعداد محصولات
 * - uniqueColors: تعداد رنگ‌ها
 * - uniqueSizes: تعداد سایزها
 */
