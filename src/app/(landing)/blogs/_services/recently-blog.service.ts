"use server";
import { prisma } from "@/prisma/prisma";

const MAX_RECENT_BLOGS = 20;

import type { Blog } from "./blog.api";

// ============ گرفتن لیست آخرین بلاگ‌های مطالعه‌شده ============
export async function getRecentlyBlogs(userId?: number): Promise<Blog[]> {
  if (!userId) return [];

  const currentUser = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      recently_blogs: true,
    },
  });

  if (!currentUser || currentUser.recently_blogs.length === 0) {
    return [];
  }

  const blogs = await prisma.blogs.findMany({
    where: {
      id: {
        in: currentUser.recently_blogs,
      },
      status: 1,
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          liked_blogs: true,
          saved_blogs: true,
        },
      },
      liked_blogs: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
        },
      },
      saved_blogs: {
        where: {
          user_id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });

  const orderedBlogs = currentUser.recently_blogs
    .map((id) => blogs.find((blog) => blog.id === id))
    .filter((blog): blog is (typeof blogs)[number] => Boolean(blog));

  return orderedBlogs.map((blog) => ({
    ...blog,
    likeCount: blog._count.liked_blogs,
    saveCount: blog._count.saved_blogs,
    isLiked: blog.liked_blogs.length > 0,
    isSaved: blog.saved_blogs.length > 0,
  }));
}

export async function addRecentlyViewedBlog(userId: number, blogId: number) {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      recently_blogs: true,
    },
  });

  if (!user) return;

  const recently = [
    blogId,
    ...user.recently_blogs.filter((id) => id !== blogId),
  ].slice(0, MAX_RECENT_BLOGS);

  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      recently_blogs: recently,
    },
  });
}
