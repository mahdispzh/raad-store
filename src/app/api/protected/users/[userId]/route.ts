import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    userId: string;
  }>;
};

export const GET = withAuth(
  async (req, user, context?: Params) => {
    const { userId } = await context!.params;
    console.log("dd", userId);
    const targetUser = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },

      include: {
        carts: true,
        orders: true,
        user_addresses: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(targetUser);
  },
  [1, 2],
);

export const PUT = withAuth(
  async (req, admin, context?: Params) => {
    const { userId } = await context!.params;

    const body = await req.json();

    const updatedUser = await prisma.users.update({
      where: {
        id: Number(userId),
      },

      data: {
        name: body.name,
        mail: body.mail,
        recently_search: body.recentlySearch,
        recently_viewed: body.recentlyView,
        phone: body.phone,
        // role: body.role,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(updatedUser);
  },
  [1, 2],
);

export const DELETE = withAuth(
  async (req, admin, context?: Params) => {
    const { userId } = await context!.params;

    await prisma.users.delete({
      where: {
        id: Number(userId),
      },
    });

    return NextResponse.json({
      success: true,
    });
  },
  [2],
);
