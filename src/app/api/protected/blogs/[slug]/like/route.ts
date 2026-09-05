import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const POST = withAuth(
  async (req, user, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const blog = await prisma.blogs.findUnique({
      where: {
        slug: slug,
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

    const liked = await prisma.liked_blogs.findFirst({
      where: {
        blog_id: blog.id,
        user_id: user.userId,
      },
    });

    // Unlike
    if (liked) {
      await prisma.$transaction([
        prisma.liked_blogs.delete({
          where: {
            id: liked.id,
          },
        }),
        prisma.blogs.update({
          where: {
            id: blog.id,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        }),
      ]);

      return NextResponse.json({
        liked: false,
      });
    }

    // Like
    await prisma.$transaction([
      prisma.liked_blogs.create({
        data: {
          blog_id: blog.id,
          user_id: user.userId,
        },
      }),
      prisma.blogs.update({
        where: {
          id: blog.id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      }),
    ]);

    return NextResponse.json({
      liked: true,
    });
  },
  [1, 2],
);
