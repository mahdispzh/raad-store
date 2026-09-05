import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const total = await prisma.users.count();

    const users = await prisma.users.findMany({
      skip,
      take: limit,
    });

    const hasMore = skip + users.length < total;

    return NextResponse.json({
      currentUser: user.userId,
      data: users,
      meta: {
        total,
        page,
        limit,
        hasMore,
      },
    });
  },
  [2],
);
