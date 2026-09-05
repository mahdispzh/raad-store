import { prisma } from "@/prisma/prisma";

export async function getCommentSummary(id: number) {
  const [
    totalComments,

    approvedComments,
    pendingComments,
    rejectedComments,

    anonymousComments,

    lastComment,
  ] = await Promise.all([
    prisma.comments.count({
      where: {
        user_id: id,
      },
    }),

    prisma.comments.count({
      where: {
        user_id: id,
        status: 1,
      },
    }),

    prisma.comments.count({
      where: {
        user_id: id,
        status: 0,
      },
    }),

    prisma.comments.count({
      where: {
        user_id: id,
        status: 2,
      },
    }),

    prisma.comments.count({
      where: {
        user_id: id,
        isUnknown: true,
      },
    }),

    prisma.comments.findFirst({
      where: {
        user_id: id,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        products: true,
      },
    }),
  ]);

  return {
    totalComments,

    approvedComments,

    pendingComments,

    rejectedComments,

    anonymousComments,

    lastComment,
  };
}
/**
 * خروجی خلاصه کامنت‌های کاربر
 *
 * totalComments
 * تعداد کل کامنت‌های ثبت شده توسط کاربر
 *
 * approvedComments
 * تعداد کامنت‌های تایید شده
 *
 * pendingComments
 * تعداد کامنت‌های در انتظار تایید
 *
 * rejectedComments
 * تعداد کامنت‌های رد شده
 *
 * anonymousComments
 * تعداد کامنت‌های ناشناس کاربر
 *
 * lastComment
 * آخرین کامنت ثبت شده کاربر به همراه اطلاعات محصول
 */
