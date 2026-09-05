import { prisma } from "@/prisma/prisma";

export async function getProductsSummary() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalProducts,
    activeProducts,
    inactiveProducts,
    pendingProducts, // ✅ جدید — status: 2
    newProducts, // ✅ جدید — ثبت‌شده در ۷ روز اخیر
    outOfStockProducts, // ✅ جدید — محصولاتی با حداقل یک واریانت ناموجود
    discountedProducts,
    noDiscountProducts,
    totalVariants,
    stockAggregate,
    outOfStockVariants,
    lowStockVariants,
    criticalStockVariants,
  ] = await Promise.all([
    prisma.products.count(),

    prisma.products.count({
      where: { status: 1 },
    }),

    prisma.products.count({
      where: { status: 0 },
    }),

    prisma.products.count({
      where: { status: 2 },
    }),

    prisma.products.count({
      where: {
        created_at: { gte: sevenDaysAgo },
      },
    }),

    prisma.products.count({
      where: {
        product_variants: {
          some: { stock: 0 },
        },
      },
    }),

    prisma.products.count({
      where: {
        discount: {
          gt: 0,
        },
      },
    }),

    prisma.products.count({
      where: {
        OR: [{ discount: 0 }, { discount: null }],
      },
    }),

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
          lte: 5,
        },
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
  ]);

  return {
    totalProducts,
    activeProducts,
    inactiveProducts,
    pendingProducts,
    newProducts,
    outOfStockProducts,

    discountedProducts,
    noDiscountProducts,

    totalVariants,

    totalStock: stockAggregate._sum.stock ?? 0,

    outOfStockVariants,
    lowStockVariants,
    criticalStockVariants,
  };
}

/**
 * خروجی Summary
 *
 * totalProducts          => تعداد کل محصولات
 * activeProducts         => تعداد محصولات فعال
 * inactiveProducts       => تعداد محصولات غیرفعال
 * pendingProducts        => تعداد محصولات در انتظار تایید (status: 2)
 * newProducts            => تعداد محصولات ثبت‌شده در ۷ روز اخیر
 * outOfStockProducts     => تعداد محصولاتی که حداقل یک واریانتشون ناموجوده
 * discountedProducts     => تعداد محصولات دارای تخفیف
 * noDiscountProducts     => تعداد محصولات بدون تخفیف
 * totalVariants          => تعداد کل واریانت‌ها
 * totalStock             => مجموع موجودی تمام واریانت‌ها
 * outOfStockVariants     => تعداد واریانت‌های ناموجود
 * lowStockVariants       => تعداد واریانت‌های کم موجودی
 * criticalStockVariants  => تعداد واریانت‌های بحرانی
 */