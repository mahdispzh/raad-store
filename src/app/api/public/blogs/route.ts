import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const userId = Number(searchParams.get("userId")) || null;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const skip = (page - 1) * limit;
  const where = { status: 1 };
  // const total = await prisma.blogs.count();
  const total = await prisma.blogs.count({ where });

  const blogs = await prisma.blogs.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      created_at: "desc", 
    },
    include: {
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
}
  });

  const hasMore = skip + blogs.length < total;

  return NextResponse.json({
    data: blogs.map((blog) => ({
      ...blog,
      likeCount: blog._count.liked_blogs,
      saveCount: blog._count.saved_blogs,
    })),
    meta: {
      total,
      page,
      limit,
      hasMore,
    },
  });
}