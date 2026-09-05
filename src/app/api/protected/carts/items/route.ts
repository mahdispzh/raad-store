import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const POST = withAuth(
  async (req, user) => {
    const body = await req.json();

    const { productVariantId, quantity } = body;

    let cart = await prisma.carts.findFirst({
      where: {
        user_id: user.userId,
      },
    });

    if (!cart) {
      cart = await prisma.carts.create({
        data: {
          user_id: user.userId,
          created_at: new Date(),
        },
      });
    }

    const existingItem = await prisma.cart_items.findFirst({
      where: {
        cart_id: cart.id,
        variant_id: productVariantId,
      },
    });

    if (existingItem) {
      const item = await prisma.cart_items.update({
        where: {
          id: existingItem.id,
        },

        data: {
          quantity: existingItem.quantity + quantity,
        },
      });

      return NextResponse.json(item);
    }

    const item = await prisma.cart_items.create({
      data: {
        cart_id: cart.id,
        variant_id: productVariantId,
        quantity,
      },
    });

    return NextResponse.json(item);
  },
  [1, 2],
);
