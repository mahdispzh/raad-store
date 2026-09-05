/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request, ctx: any) {
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

  // افزایش بازدید
  await prisma.products.update({
    where: {
      id: product.id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  // دریافت اطلاعات کامل محصول
  const productDetails = await prisma.products.findUnique({
    where: {
      id: product.id,
    },
    include: {
      brands: true,
      categories: true,

      features: {
        select: {
          name: true,
          value: true,
        },
      },

      product_variants: {
        include: {
          colors: true,
          sizes: true,
        },
      },

      ratings: {
        select: {
          id: true,
          rating: true,
          user_id: true,
        },
      },

      comments: {
        where: {
          status: 1,
        },
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          user_id: true,
          isUnknown: true,
          parent_id: true,
          created_at: true,
          text: true,
          status: true,
          users: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!productDetails) {
    return NextResponse.json(
      {
        message: "Product not found",
      },
      {
        status: 404,
      },
    );
  }

  // ساخت Map برای امتیاز کاربران
  const ratingMap = new Map<number, number>();

  productDetails.ratings.forEach((rating) => {
    ratingMap.set(rating.user_id, rating.rating);
  });

  // اضافه کردن امتیاز هر کاربر به کامنتش
  const commentsWithRating = productDetails.comments.map((comment) => ({
    ...comment,
    rating: ratingMap.get(comment.user_id) ?? null,
  }));

  return NextResponse.json({
    ...productDetails,
    comments: commentsWithRating,
  });
}