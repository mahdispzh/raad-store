import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const PUT = withAuth(
  async (req, user) => {
    const body = await req.json();

    const { quantity } = body;

    const itemId = Number(req.nextUrl.pathname.split("/").pop());

    const item = await prisma.cart_items.update({
      where: {
        id: itemId,
      },

      data: {
        quantity,
      },
    });

    return NextResponse.json(item);
  },
  [1, 2],
);

export const DELETE = withAuth(
  async (req) => {
    const itemId = Number(req.nextUrl.pathname.split("/").pop());

    await prisma.cart_items.delete({
      where: {
        id: itemId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  },
  [1, 2],
);
