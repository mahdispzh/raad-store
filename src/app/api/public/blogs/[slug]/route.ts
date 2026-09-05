import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const searchParams = new URL(req.url).searchParams;
  const userId = Number(searchParams.get("userId")) || null;

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

  if (!blog) {
    return NextResponse.json(
      {
        message: "Blog not found",
      },
      {
        status: 404,
      }
    );
  }

  const updatedBlog = await prisma.blogs.update({
    where: {
      id: blog.id,
    },
    data: {
      view: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({
    ...blog,
    view: updatedBlog.view,

    likeCount: blog._count.liked_blogs,
    saveCount: blog._count.saved_blogs,

    isLiked: userId ? blog.liked_blogs.length > 0 : false,
    isSaved: userId ? blog.saved_blogs.length > 0 : false,
  });
}