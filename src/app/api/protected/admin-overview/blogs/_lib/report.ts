import { prisma } from "@/prisma/prisma";

export async function getBlogsReport() {
  const [
    newestBlogs,

    topViewedBlogs,

    topLikedBlogs,

    mostCommentedBlogs,

    draftBlogsReport,

    publishedBlogsReport,
        topAuthors, // ✅ اضافه شد
  ] = await Promise.all([
    prisma.blogs.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
    }),

    prisma.blogs.findMany({
      take: 10,
      orderBy: {
        view: "desc",
      },
    }),

    prisma.blogs.findMany({
      take: 10,
      orderBy: {
        likes: "desc",
      },
    }),

    prisma.blogs.findMany({
      take: 10,
      orderBy: {
        comments: "desc",
      },
    }),

    prisma.blogs.findMany({
      where: {
        status: 0,
      },
      take: 10,
    }),

    prisma.blogs.findMany({
      where: {
        status: 1,
      },
      take: 10,
    }),
     prisma.users.findMany({
      take: 10,
      where: { blogs: { some: {} } },
      orderBy: { blogs: { _count: "desc" } },
      select: {
        id: true,
        name: true,
        image_id: true,
        _count: { select: { blogs: true } },
      },
    }),
  ]);

  return {
    newestBlogs,
    topViewedBlogs,
    topLikedBlogs,
    mostCommentedBlogs,
    draftBlogs: draftBlogsReport,
    publishedBlogs: publishedBlogsReport,
        topAuthors, 
  };
}
/**
 * دریافت گزارش‌های قابل نمایش در جدول‌های داشبورد وبلاگ
 *
 * خروجی:
 * - newestBlogs: ۱۰ وبلاگ جدید
 * - topViewedBlogs: ۱۰ وبلاگ با بیشترین بازدید
 * - topLikedBlogs: ۱۰ وبلاگ با بیشترین لایک
 * - mostCommentedBlogs: ۱۰ وبلاگ با بیشترین کامنت
 * - draftBlogs: ۱۰ پیش‌نویس آخر
 * - publishedBlogs: ۱۰ وبلاگ منتشرشده
 */
