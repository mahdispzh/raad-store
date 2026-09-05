/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

// GET: دریافت لیست علاقه‌مندی‌ها
export const GET = withAuth(
  async (req, user) => {
    const favorites = await prisma.likes.findMany({
      where: {
        user_id: user.userId,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        products: { 
          include: {
            brands: true,
            categories: true,
            product_variants: {
              include: {
                colors: true,
                sizes: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(favorites);
  },
  [1, 2],
);

// POST: لایک/آنلایک کردن محصول (با دریافت productId از body)
export const POST = withAuth(
  async (req, user) => {
    const body = await req.json();
    const { productId } = body;
    const pid = Number(productId);
    const userId = user.userId;

    const existing = await prisma.likes.findUnique({
      where: {
        product_id_user_id: {
          product_id: pid,
          user_id: userId,
        },
      },
    });

    // 🔥 if already liked → unlike
    if (existing) {
      await prisma.likes.delete({
        where: {
          product_id_user_id: {
            product_id: pid,
            user_id: userId,
          },
        },
      });

      const count = await prisma.likes.count({
        where: { product_id: pid },
      });

      return NextResponse.json({
        liked: false,
        likesCount: count,
      });
    }

    // ❤️ else like
    await prisma.likes.create({
      data: {
        product_id: pid,
        user_id: userId,
        created_at: new Date(),
      },
    });

    const count = await prisma.likes.count({
      where: { product_id: pid },
    });

    return NextResponse.json({
      liked: true,
      likesCount: count,
    });
  },
  [1, 2],
);