import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(async (req, user) => {
  const searchParams = new URL(req.url).searchParams;

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const skip = (page - 1) * limit;

  const total = await prisma.saved_blogs.count({
    where: {
      user_id: user.userId,
    },
  });

  const blogs = await prisma.saved_blogs.findMany({
    where: {
      user_id: user.userId,
    },
    skip,
    take: limit,
    orderBy: {
      created_at: "desc",
    },
    include: {
      blogs: {
        include: {
          users: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    data: blogs.map((item) => item.blogs),
    meta: {
      total,
      page,
      limit,
      hasMore: skip + blogs.length < total,
    },
  });
});

export const POST = withAuth(
  async (req, user) => {
    const body = await req.json();

    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        {
          message: "Slug is required",
        },
        {
          status: 400,
        },
      );
    }

    const blog = await prisma.blogs.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog not found",
        },
        {
          status: 404,
        },
      );
    }

    const saved = await prisma.saved_blogs.findFirst({
      where: {
        blog_id: blog.id,
        user_id: user.userId,
      },
    });

    if (saved) {
      await prisma.saved_blogs.delete({
        where: {
          id: saved.id,
        },
      });

      return NextResponse.json({
        saved: false,
      });
    }

    await prisma.saved_blogs.create({
      data: {
        blog_id: blog.id,
        user_id: user.userId,
        created_at: new Date(),
      },
    });

    return NextResponse.json({
      saved: true,
    });
  },
  [1, 2],
);
