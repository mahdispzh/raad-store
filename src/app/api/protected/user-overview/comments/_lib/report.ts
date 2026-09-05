import { prisma } from "@/prisma/prisma";

export async function getCommentReport(id: number) {
  const [
    commentList,

    latestComments,

    approvedCommentList,

    pendingCommentList,

    rejectedCommentList,
  ] = await Promise.all([
    prisma.comments.findMany({
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

    prisma.comments.findMany({
      where: {
        user_id: id,
      },
      take: 5,
      orderBy: {
        created_at: "desc",
      },
      include: {
        products: true,
      },
    }),

    prisma.comments.findMany({
      where: {
        user_id: id,
        status: 1,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        products: true,
      },
    }),

    prisma.comments.findMany({
      where: {
        user_id: id,
        status: 0,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        products: true,
      },
    }),

    prisma.comments.findMany({
      where: {
        user_id: id,
        status: 2,
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
    commentList,

    latestComments,

    approvedCommentList,

    pendingCommentList,

    rejectedCommentList,
  };
}
/**
 * خروجی گزارش کامنت‌های کاربر
 *
 * commentList
 * لیست تمام کامنت‌های کاربر
 *
 * latestComments
 * ۵ کامنت آخر کاربر
 *
 * approvedCommentList
 * لیست کامنت‌های تایید شده
 *
 * pendingCommentList
 * لیست کامنت‌های در انتظار تایید
 *
 * rejectedCommentList
 * لیست کامنت‌های رد شده
 */
