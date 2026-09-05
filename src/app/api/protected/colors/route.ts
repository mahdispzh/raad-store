// GET /protected/colors
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const sort = searchParams.get("sort");

    const skip = (page - 1) * limit;

    const orderBy =
      sort === "oldest"
        ? { created_at: "asc" as const }
        : sort === "name"
          ? { name: "asc" as const }
          : { created_at: "desc" as const }; // newest / پیش‌فرض

    const total = await prisma.colors.count();

    const colors = await prisma.colors.findMany({
      skip,
      take: limit,
      orderBy,
    });

    const hasMore = skip + colors.length < total;

    return NextResponse.json({
      data: colors,
      meta: { total, page, limit, hasMore },
    });
  },
  [2],
);

export const POST = withAuth(
  async (req) => {
    const body = await req.json();

    const color = await prisma.colors.create({
      data: {
        name: body.name,
        hex_code: body.hexCode,
      },
    });

    return NextResponse.json(color);
  },
  [2],
);