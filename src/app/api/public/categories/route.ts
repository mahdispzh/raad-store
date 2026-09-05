import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const skip = (page - 1) * limit;

  const total = await prisma.categories.count();

  const [categories, productCounts] = await Promise.all([
    prisma.categories.findMany({
      orderBy: {
        id: "asc",
      },
    }),

    prisma.products.groupBy({
  by: ["category_id"],
  where: {
    product_variants: {
      some: {
        is_active: true,
      },
    },
  },
  _count: {
    id: true,
  },
})
  ]);

  const productCountMap = new Map(
    productCounts.map((item) => [
      item.category_id,
      item._count.id,
    ])
  );

  const result = categories
    .filter((c) => c.parent_id === null)
    .slice(skip, skip + limit)
    .map((parent) => {
      const children = categories
        .filter((child) => child.parent_id === parent.id)
        .map((child) => ({
          ...child,
          productsCount:
            productCountMap.get(child.id) ?? 0,
        }));

      return {
        ...parent,
        productsCount:
          productCountMap.get(parent.id) ?? 0,
        childrenCount: children.length,
        children,
      };
    });

  const hasMore = skip + result.length < total;

  return NextResponse.json({
    data: result,
    meta: {
      total,
      page,
      limit,
      hasMore,
    },
  });
}