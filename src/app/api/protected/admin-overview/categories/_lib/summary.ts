import { prisma } from "@/prisma/prisma";

export async function getCategoriesSummary() {
  const [
    totalCategories,

    rootCategories,

    childCategories,

    categoriesWithProducts,

    emptyCategories,

    totalProducts,

    averageProductsPerCategory,
  ] = await Promise.all([
    prisma.categories.count(),

    prisma.categories.count({
      where: {
        parent_id: null,
      },
    }),

    prisma.categories.count({
      where: {
        NOT: {
          parent_id: null,
        },
      },
    }),

    prisma.categories.count({
      where: {
        products: {
          some: {},
        },
      },
    }),

    prisma.categories.count({
      where: {
        products: {
          none: {},
        },
      },
    }),

    prisma.products.count(),

    prisma.categories.aggregate({
      _count: {
        id: true,
      },
    }),
  ]);

  return {
    totalCategories,

    rootCategories,

    childCategories,

    categoriesWithProducts,

    emptyCategories,

    totalProducts,

    averageProductsPerCategory:
      totalProducts === 0 ? 0 : Math.round(totalProducts / totalCategories),
  };
}
/**
 * دریافت خلاصه آماری دسته‌بندی‌ها
 *
 * خروجی:
 * - totalCategories: تعداد کل دسته‌بندی‌ها
 * - rootCategories: تعداد دسته‌بندی‌های اصلی
 * - childCategories: تعداد زیر‌دسته‌ها
 * - categoriesWithProducts: تعداد دسته‌بندی‌های دارای محصول
 * - emptyCategories: تعداد دسته‌بندی‌های بدون محصول
 * - totalProducts: تعداد کل محصولات
 * - averageProductsPerCategory: میانگین تعداد محصولات در هر دسته‌بندی
 */
