import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user) => {
    let cart = await prisma.carts.findFirst({
      where: {
        user_id: user.userId,
      },

      include: {
        cart_items: {
          include: {
            product_variants: {
              include: {
                products: true,
                sizes: true,
                colors: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.carts.create({
        data: {
          user_id: user.userId,
          created_at: new Date(),
        },

        include: {
          cart_items: {
            include: {
              product_variants: true,
            },
          },
        },
      });
    }

    return NextResponse.json(cart);
  },
  [1, 2],
);
export const DELETE = withAuth(
  async (req, user) => {
    const cart = await prisma.carts.findFirst({
      where: {
        user_id: user.userId,
      },
    });

    if (!cart) {
      return NextResponse.json({
        success: true,
      });
    }

    await prisma.cart_items.deleteMany({
      where: {
        cart_id: cart.id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  },
  [1, 2],
);
