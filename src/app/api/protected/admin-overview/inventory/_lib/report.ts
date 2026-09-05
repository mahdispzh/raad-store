import { prisma } from "@/prisma/prisma";

export async function getProductVariantsReport() {
  const [
    outOfStockProducts,

    criticalProducts,

    lowStockProducts,

    highestStockProducts,

    newestVariants,

    lowestStockVariants,
  ] = await Promise.all([
    prisma.product_variants.findMany({
      where: {
        stock: 0,
      },
      take: 10,
      include: {
        products: true,
        colors: true,
        sizes: true,
      },
    }),

    prisma.product_variants.findMany({
      where: {
        stock: {
          gt: 0,
          lte: 2,
        },
      },
      take: 10,
      orderBy: {
        stock: "asc",
      },
      include: {
        products: true,
        colors: true,
        sizes: true,
      },
    }),

    prisma.product_variants.findMany({
      where: {
        stock: {
          gt: 2,
          lte: 5,
        },
      },
      take: 10,
      orderBy: {
        stock: "asc",
      },
      include: {
        products: true,
        colors: true,
        sizes: true,
      },
    }),

    prisma.product_variants.findMany({
      take: 10,
      orderBy: {
        stock: "desc",
      },
      include: {
        products: true,
        colors: true,
        sizes: true,
      },
    }),

    prisma.product_variants.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        products: true,
        colors: true,
        sizes: true,
      },
    }),

    prisma.product_variants.findMany({
      take: 10,
      orderBy: {
        stock: "asc",
      },
      include: {
        products: true,
        colors: true,
        sizes: true,
      },
    }),
  ]);
console.dir(
  lowestStockVariants.map((v) => ({
    id: v.id,
    productId: v.product_id,
    product: v.products,
  })),
  { depth: null },
);
  return {
    outOfStockProducts,
    criticalProducts,
    lowStockProducts,
    highestStockProducts,
    newestVariants,
    lowestStockVariants,
  };
}
/**
 * دریافت گزارش‌های داشبورد تنوع‌های محصولات
 *
 * خروجی:
 * - outOfStockProducts: ۱۰ تنوع ناموجود
 * - criticalProducts: ۱۰ تنوع با موجودی بحرانی
 * - lowStockProducts: ۱۰ تنوع با موجودی کم
 * - highestStockProducts: ۱۰ تنوع با بیشترین موجودی
 * - newestVariants: ۱۰ تنوع ایجاد شده اخیر
 * - lowestStockVariants: ۱۰ تنوع با کمترین موجودی
 */
