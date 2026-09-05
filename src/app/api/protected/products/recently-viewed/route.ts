import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const POST = withAuth(
  async (req, user) => {
    const body = await req.json();

    const productId = Number(body.productId);

    if (!productId) {
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 },
      );
    }

    const currentUser = await prisma.users.findUnique({
      where: {
        id: user.userId,
      },
      select: {
        recently_viewed: true,
      },
    });

    const updatedRecentlyViewed = [
      productId,
      ...(currentUser?.recently_viewed || []).filter((id) => id !== productId),
    ].slice(0, 20);

    await prisma.users.update({
      where: {
        id: user.userId,
      },
      data: {
        recently_viewed: updatedRecentlyViewed,
      },
    });

    return NextResponse.json({
      success: true,
    });
  },
  [1, 2],
);
