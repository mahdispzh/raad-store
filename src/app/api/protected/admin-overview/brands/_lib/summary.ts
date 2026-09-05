import { prisma } from "@/prisma/prisma";

export async function getBrandsSummary() {
  const [
    totalBrands,

    brandsWithProducts,

    emptyBrands,

    totalProducts,

    averageProductsPerBrand,

    newestBrand,

    oldestBrand,
  ] = await Promise.all([
    prisma.brands.count(),

    prisma.brands.count({
      where: {
        products: {
          some: {},
        },
      },
    }),

    prisma.brands.count({
      where: {
        products: {
          none: {},
        },
      },
    }),

    prisma.products.count(),

    prisma.brands.aggregate({
      _count: {
        id: true,
      },
    }),

    prisma.brands.findFirst({
      orderBy: {
        created_at: "desc",
      },
    }),

    prisma.brands.findFirst({
      orderBy: {
        created_at: "asc",
      },
    }),
  ]);

  return {
    totalBrands,

    brandsWithProducts,

    emptyBrands,

    totalProducts,

    averageProductsPerBrand:
      averageProductsPerBrand || totalBrands === 0
        ? 0
        : Math.round(totalProducts / totalBrands),

    newestBrand,

    oldestBrand,
  };
}
/**
 * دریافت خلاصه آماری برندها
 *
 * خروجی:
 * - totalBrands: تعداد کل برندها
 * - brandsWithProducts: تعداد برندهای دارای حداقل یک محصول
 * - emptyBrands: تعداد برندهای بدون محصول
 * - totalProducts: تعداد کل محصولات
 * - averageProductsPerBrand: میانگین تعداد محصولات هر برند
 * - newestBrand: جدیدترین برند ثبت شده
 * - oldestBrand: قدیمی‌ترین برند ثبت شده
 */
