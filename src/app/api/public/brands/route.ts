import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const skip = (page - 1) * limit;

  const total = await prisma.brands.count();

  const brands = await prisma.brands.findMany({
    orderBy: {
      id: "asc",
    },
    skip,
    take: limit,
  });

  const hasMore = skip + brands.length < total;

  return NextResponse.json({
    data: brands,
    meta: {
      total,
      page,
      limit,
      hasMore,
    },
  });
}
