// src/app/(landing)/blogs/_services/blog.api.ts
export interface Blog {
  id: number;
  title: string;
  slug: string;
  author?: string | null;
  summary: string | null;
  image: string | null;
  content: string;
  status: number;
  rading_time: string | null;
  user_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  view: number | null;
  users: {
    id: number;
    name: string | null;
  };
  likes: number | null;
  saveCount: number;
  isLiked: boolean;
  isSaved: boolean;
}

export interface BlogsResponse {
  data: Blog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

import { prisma } from "@/prisma/prisma";
import { verifyToken } from "@/src/shared/auth/jwt";
import { cookies } from "next/headers";
import { addRecentlyViewedBlog } from "./recently-blog.service";

export interface GetBlogsParams {
  page?: number;
  limit?: number;
  userId?: number;
}

export async function getBlogs({
  page = 1,
  limit = 10,
  userId: providedUserId,
}: GetBlogsParams = {}) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let userId = providedUserId;

  if (userId === undefined && refreshToken) {
    try {
      const payload = verifyToken(refreshToken);
      userId = payload.userId;
    } catch {
      userId = undefined;
    }
  }

  const skip = (page - 1) * limit;

  const total = await prisma.blogs.count();

  const blogs = await prisma.blogs.findMany({
    skip,
    take: limit,
    where: {
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
      liked_blogs: userId
        ? {
            where: {
              user_id: userId,
            },
            select: {
              id: true,
            },
          }
        : false,
      saved_blogs: userId
        ? {
            where: {
              user_id: userId,
            },
            select: {
              id: true,
            },
          }
        : false,
    },
  });

  const hasMore = skip + blogs.length < total;

  return {
    data: blogs.map((blog) => ({
      ...blog,
      likeCount: blog._count.liked_blogs,
      saveCount: blog._count.saved_blogs,
      isLiked: userId ? blog.liked_blogs.length > 0 : false,
      isSaved: userId ? blog.saved_blogs.length > 0 : false,
    })),
    meta: {
      total,
      page,
      limit,
      hasMore,
    },
  };
}

// ✅ دریافت یک بلاک با slug

export async function getBlogBySlug(slug: string, userId?: number) {
  const blog = await prisma.blogs.findUnique({
    where: {
      slug,
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
      liked_blogs: userId
        ? {
            where: {
              user_id: userId,
            },
            select: {
              id: true,
            },
          }
        : false,
      saved_blogs: userId
        ? {
            where: {
              user_id: userId,
            },
            select: {
              id: true,
            },
          }
        : false,
    },
  });

  if (!blog) return null;

  const updateViewPromise = prisma.blogs.update({
    where: {
      id: blog.id,
    },
    data: {
      view: {
        increment: 1,
      },
    },
    select: {
      view: true,
    },
  });

  const recentlyPromise = userId
    ? addRecentlyViewedBlog(userId, blog.id)
    : Promise.resolve();

  const [updatedBlog] = await Promise.all([updateViewPromise, recentlyPromise]);

  return {
    ...blog,

    view: updatedBlog.view,

    likeCount: blog._count.liked_blogs,
    saveCount: blog._count.saved_blogs,

    isLiked: userId ? blog.liked_blogs.length > 0 : false,
    isSaved: userId ? blog.saved_blogs.length > 0 : false,
  };
}
