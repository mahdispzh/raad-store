import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
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
}
