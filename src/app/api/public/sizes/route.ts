import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const skip = (page - 1) * limit;

  const total = await prisma.sizes.count();

  const sizes = await prisma.sizes.findMany({
    orderBy: {
      sort_order: "asc",
    },
    skip,
    take: limit,
  });

  const hasMore = skip + sizes.length < total;

  return NextResponse.json({
    data: sizes,
    meta: {
      total,
      page,
      limit,
      hasMore,
    },
  });
}
