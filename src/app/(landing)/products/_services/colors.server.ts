// src/app/(landing)/products/_services/colors.server.ts
"use server";
import { prisma } from "@/prisma/prisma";

export interface GetColorsParams {
  page?: number;
  limit?: number;
}

export async function getColors({
  page = 1,
  limit = 10,
}: GetColorsParams = {}) {
  const skip = (page - 1) * limit;

  const [total, colors] = await Promise.all([
    prisma.colors.count(),
    prisma.colors.findMany({
      skip,
      take: limit,
      orderBy: {
        id: "asc",
      },
    }),
  ]);

  return {
    data: colors,
    meta: {
      total,
      page,
      limit,
      hasMore: skip + colors.length < total,
    },
  };
}
