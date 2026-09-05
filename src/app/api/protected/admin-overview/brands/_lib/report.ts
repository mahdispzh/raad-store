import { prisma } from "@/prisma/prisma";

export async function getBrandsReport() {
  const [
    topBrands,

    emptyBrandList,

    newestBrands,

    oldestBrands,

    brandsNewestProducts,

    brandsMostViewedProducts,
  ] = await Promise.all([
    prisma.brands.findMany({
      take: 10,
      orderBy: {
        products: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    }),

    prisma.brands.findMany({
      where: {
        products: {
          none: {},
        },
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    }),

    prisma.brands.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
    }),

    prisma.brands.findMany({
      take: 10,
      orderBy: {
        created_at: "asc",
      },
    }),

    prisma.brands.findMany({
      take: 10,
      include: {
        products: {
          take: 5,
          orderBy: {
            created_at: "desc",
          },
        },
      },
    }),

    prisma.brands.findMany({
      take: 10,
      include: {
        products: {
          take: 5,
          orderBy: {
            views: "desc",
          },
        },
      },
    }),
  ]);

  return {
    topBrands,

    emptyBrandList,

    newestBrands,

    oldestBrands,

    brandsNewestProducts,

    brandsMostViewedProducts,
  };
}
/**
 * دریافت گزارش‌های داشبورد برندها
 *
 * خروجی:
 * - topBrands: ۱۰ برند با بیشترین تعداد محصول
 * - emptyBrandList: لیست برندهای بدون محصول
 * - newestBrands: ۱۰ برند جدید
 * - oldestBrands: ۱۰ برند قدیمی
 * - brandsNewestProducts: ۱۰ برند به همراه ۵ محصول جدید هر برند
 * - brandsMostViewedProducts: ۱۰ برند به همراه ۵ محصول پربازدید هر برند
 */
