import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const total = await prisma.discounts.count();

    const discounts = await prisma.discounts.findMany({
      skip,
      take: limit,
    });

    const hasMore = skip + discounts.length < total;

    return NextResponse.json({
      data: discounts,
      meta: {
        total,
        page,
        limit,
        hasMore,
      },
    });
  },
  [2],
);

export const POST = withAuth(
  async (req) => {
    const body = await req.json();

    const discount = await prisma.discounts.create({
      data: {
        code: body.code,
        type: body.type,
        value: body.value,
      },
    });

    return NextResponse.json(discount);
  },
  [2],
);
