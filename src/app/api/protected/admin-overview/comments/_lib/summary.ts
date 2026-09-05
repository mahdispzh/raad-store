import { prisma } from "@/prisma/prisma";
import { jalaliMonthRange } from "@/src/shared/utils/analytics";

export async function getCommentsSummary() {
  const { start: thisJalaliMonthStart, end: thisJalaliMonthEnd } =
    jalaliMonthRange(0);

  const [
    totalComments,

    approvedComments,
    pendingComments,
    rejectedComments,

    anonymousComments,

    todayComments,
    thisMonthComments,

    productWithComments,
    usersWithComments,
  ] = await Promise.all([
    prisma.comments.count(),

    prisma.comments.count({
      where: {
        status: 1,
      },
    }),

    prisma.comments.count({
      where: {
        status: 0,
      },
    }),

    prisma.comments.count({
      where: {
        status: 2,
      },
    }),

    prisma.comments.count({
      where: {
        isUnknown: true,
      },
    }),

    prisma.comments.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    prisma.comments.count({
      where: {
        created_at: {
          gte: thisJalaliMonthStart,
          lt: thisJalaliMonthEnd,
        },
      },
    }),

    prisma.products.count({
      where: {
        comments: {
          some: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        comments: {
          some: {},
        },
      },
    }),
  ]);

  return {
    totalComments,

    approvedComments,
    pendingComments,
    rejectedComments,

    anonymousComments,

    todayComments,
    thisMonthComments,

    productWithComments,
    usersWithComments,
  };
}
/**
 * دریافت خلاصه آماری کامنت‌ها
 *
 * خروجی:
 * - totalComments: تعداد کل کامنت‌ها
 * - approvedComments: تعداد کامنت‌های تایید شده
 * - pendingComments: تعداد کامنت‌های در انتظار تایید
 * - rejectedComments: تعداد کامنت‌های رد شده
 * - anonymousComments: تعداد کامنت‌های ناشناس
 * - todayComments: تعداد کامنت‌های ثبت شده امروز
 * - thisMonthComments: تعداد کامنت‌های ثبت شده در ماه جاری
 * - productWithComments: تعداد محصولاتی که حداقل یک کامنت دارند
 * - usersWithComments: تعداد کاربرانی که حداقل یک کامنت ثبت کرده‌اند
 */