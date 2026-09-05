import type { Prisma } from "@/prisma/generated/prisma/client";
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const search = searchParams.get("search")?.trim() || "";

    const skip = (page - 1) * limit;

  const where: Prisma.ordersWhereInput = {
      status: { not: 0 }, // 👈 حذف سفارش‌های وضعیت 0 مستقیم توی کوئری
    };
    if (search) {
      where.OR = [];

      if (!Number.isNaN(Number(search))) {
        where.OR.push({
          id: Number(search),
        });
      }

      where.OR.push(
        {
          users: {
            is: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
        {
          users: {
            is: {
              phone: {
                contains: search,
              },
            },
          },
        },
        {
          users: {
            is: {
              mail: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
        {
          payments: {
            some: {
              transaction_code: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
        {
          order_items: {
            some: {
              products: {
                is: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        },
      );
    }

    const total = await prisma.orders.count({
      where,
    });

    const orders = await prisma.orders.findMany({
      where,
      include: {
        users: true,
        order_items: {
          include: {
            products: true,
          },
        },
        payments: true,
      },
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      data: orders,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + orders.length < total,
      },
    });
  },
  [2],
);
