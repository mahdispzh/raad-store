import { prisma } from "@/prisma/prisma";

export async function getCategoriesReport() {
  const [
    largestCategories,

    emptyCategoryList,

    newestCategories,

    oldestCategories,

    categoriesWithoutImage,
  ] = await Promise.all([
    prisma.categories.findMany({
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

    prisma.categories.findMany({
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

    prisma.categories.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
    }),

    prisma.categories.findMany({
      take: 10,
      orderBy: {
        created_at: "asc",
      },
    }),

    prisma.categories.findMany({
      where: {
        image: "",
      },
    }),
  ]);

  return {
    largestCategories,

    emptyCategoryList,

    newestCategories,

    oldestCategories,

    categoriesWithoutImage,
  };
}
/**
 * دریافت گزارش‌های داشبورد دسته‌بندی‌ها
 *
 * خروجی:
 * - largestCategories: ۱۰ دسته‌بندی با بیشترین تعداد محصول
 * - emptyCategoryList: لیست دسته‌بندی‌های بدون محصول
 * - newestCategories: ۱۰ دسته‌بندی جدید
 * - oldestCategories: ۱۰ دسته‌بندی قدیمی
 * - categoriesWithoutImage: دسته‌بندی‌های فاقد تصویر
 */
