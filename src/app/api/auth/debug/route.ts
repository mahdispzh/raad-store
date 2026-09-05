import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
      userId: number;
    };

    const user = await prisma.users.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        name: true,
        role: true,
        auth_sessions: {
          select: {
            refresh_token_hash: true,
          },
        },
        user_addresses: {
          select: {
            id: true,
          },
          orderBy: {
            id: "desc",
          },
        },

        carts: {
          select: {
            id: true,
          },
          orderBy: {
            id: "desc",
          },
        },

        orders: {
          select: {
            id: true,
            payments: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const [
      products,
      variants,
      comments,
      blogs,
      categories,
      brands,
      discounts,
      banners,
    ] = await Promise.all([
      prisma.products.findMany({
        select: { id: true },
        take: 20,
      }),

      prisma.product_variants.findMany({
        select: { id: true },
        take: 20,
      }),

      prisma.comments.findMany({
        select: { id: true },
        take: 2,
      }),

      prisma.blogs.findMany({
        select: { id: true },
        take: 2,
      }),

      prisma.categories.findMany({
        select: { id: true },
        take: 2,
      }),

      prisma.brands.findMany({
        select: { id: true },
        take: 2,
      }),

      prisma.discounts.findMany({
        select: { id: true },
        take: 2,
      }),

      prisma.banners.findMany({
        select: { id: true },
        take: 20,
      }),
    ]);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        token: user.auth_sessions.pop()?.refresh_token_hash,
      },

      ids: {
        addresses: user.user_addresses.map((x) => x.id),
        carts: user.carts.map((x) => x.id),
        orders: user.orders.map((x) => x.id),
        payments: user.orders.flatMap((o) => o.payments.map((p) => p.id)),

        products: products.map((x) => x.id),
        variants: variants.map((x) => x.id),
        comments: comments.map((x) => x.id),
        blogs: blogs.map((x) => x.id),
        categories: categories.map((x) => x.id),
        brands: brands.map((x) => x.id),
        discounts: discounts.map((x) => x.id),
        banners: banners.map((x) => x.id),
      },
    });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export const PUT = withAuth(
  async (req, user) => {
    console.log("user", user);
    const body = await req.json();

    if (!user.userId || typeof user.role !== "number") {
      return NextResponse.json(
        {
          success: false,
          message: "userId and role are required.",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.users.findUnique({
      where: {
        id: Number(user.userId),
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 },
      );
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: Number(user.userId),
      },
      data: {
        role: body.role,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        phone: true,
        mail: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User role updated successfully.",
      data: updatedUser,
    });
  },
  [1, 2], // فقط ادمین
);
