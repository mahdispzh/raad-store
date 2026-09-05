import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const POST = withAuth(
  async (req, user, ctx: any) => {
    const { slug } = await ctx.params;

    const product = await prisma.products.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }

    const existing = await prisma.likes.findUnique({
      where: {
        product_id_user_id: {
          product_id: product.id,
          user_id: user.userId,
        },
      },
    });

    if (existing) {
      await prisma.likes.delete({
        where: {
          product_id_user_id: {
            product_id: product.id,
            user_id: user.userId,
          },
        },
      });

      const likesCount = await prisma.likes.count({
        where: {
          product_id: product.id,
        },
      });

      return NextResponse.json({
        liked: false,
        likesCount,
      });
    }

    await prisma.likes.create({
      data: {
        product_id: product.id,
        user_id: user.userId,
        created_at: new Date(),
      },
    });

    const likesCount = await prisma.likes.count({
      where: {
        product_id: product.id,
      },
    });

    return NextResponse.json({
      liked: true,
      likesCount,
    });
  },
  [1, 2],
);
