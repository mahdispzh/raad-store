import { prisma } from "@/prisma/prisma";

export async function getCommentsReport() {
  const [
    latestComments,

    pendingCommentsReport,

    rejectedCommentsReport,

    anonymousCommentsReport,

    mostCommentedProducts,

    topCommentUsers,
  ] = await Promise.all([
    prisma.comments.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        users: true,
        products: true,
      },
    }),

    prisma.comments.findMany({
      where: {
        status: 0,
      },
      take: 10,
      include: {
        users: true,
        products: true,
      },
    }),

    prisma.comments.findMany({
      where: {
        status: 2,
      },
      take: 10,
      include: {
        users: true,
        products: true,
      },
    }),

    prisma.comments.findMany({
      where: {
        isUnknown: true,
      },
      take: 10,
      include: {
        products: true,
      },
    }),

    prisma.products.findMany({
      take: 10,
      orderBy: {
        comments: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    }),

    prisma.users.findMany({
      take: 10,
      orderBy: {
        comments: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    }),
  ]);

  return {
    latestComments,

    pendingComments: pendingCommentsReport,

    rejectedComments: rejectedCommentsReport,

    anonymousComments: anonymousCommentsReport,

    mostCommentedProducts,

    topCommentUsers,
  };
}
/**
 * دریافت گزارش‌های داشبورد کامنت‌ها
 *
 * خروجی:
 * - latestComments: ۱۰ کامنت جدید
 * - pendingComments: ۱۰ کامنت در انتظار تایید
 * - rejectedComments: ۱۰ کامنت رد شده
 * - anonymousComments: ۱۰ کامنت ناشناس
 * - mostCommentedProducts: ۱۰ محصول با بیشترین تعداد کامنت
 * - topCommentUsers: ۱۰ کاربر با بیشترین تعداد کامنت
 */
