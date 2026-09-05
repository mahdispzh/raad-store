import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const total = await prisma.payments.count({
      where: {
        orders: {
          user_id: user.userId,
        },
      },
    });

    const payments = await prisma.payments.findMany({
      where: {
        orders: {
          user_id: user.userId,
        },
      },
      include: {
        orders: true,
      },
      skip,
      take: limit,
    });

    const hasMore = skip + payments.length < total;

    return NextResponse.json({
      data: payments,
      meta: {
        total,
        page,
        limit,
        hasMore,
      },
    });
  },
  [1, 2],
);
