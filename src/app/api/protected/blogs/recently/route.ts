import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (_, user) => {
    
    const currentUser = await prisma.users.findUnique({
      where: {
        id: user.userId,
      },
      select: {
        recently_blogs: true,
      },
    });

    if (!currentUser || currentUser.recently_blogs.length === 0) {
      return NextResponse.json([]);
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
            user_id: user.userId,
          },
          select: {
            id: true,
          },
        },
        saved_blogs: {
          where: {
            user_id: user.userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    // حفظ ترتیب recently_blogs
    const orderedBlogs = currentUser.recently_blogs
      .map((id) => blogs.find((blog) => blog.id === id))
      .filter(Boolean);

    return NextResponse.json(
      orderedBlogs.map((blog) => ({
        ...blog!,
        likeCount: blog!._count.liked_blogs,
        saveCount: blog!._count.saved_blogs,
        isLiked: blog!.liked_blogs.length > 0,
        isSaved: blog!.saved_blogs.length > 0,
      })),
    );
  },
  [1, 2],
);
