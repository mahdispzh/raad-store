/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req: Request) {
  console.log(await prisma.products.count());
console.log(await prisma.products.count({ where: { status: 1 } }));
const products2 = await prisma.products.findMany({
  where: {
    status: 1,
  },
});

console.log(products2.length);
  const searchParams = new URL(req.url).searchParams;

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const skip = (page - 1) * limit;

  const search = searchParams.get("search");
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const inStock = searchParams.get("inStock");
  const sort = searchParams.get("sort");
  const categoryId = searchParams.get("categoryId"); 

  const colorIds = color ? color.split(",").map(Number) : undefined;
  const sizeIds = size ? size.split(",").map(Number) : undefined;

  const where: any = {
  status: 1,
  AND: [
    {
      product_variants: {
        some: {
          is_active: true,
        },
      },
    },
  ],
};

  // 🔍 SEARCH
  if (search) {
    where.AND.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ],
    });
  }

   // ✅ فیلتر بر اساس categoryId
  if (categoryId) {
    where.AND.push({
      category_id: Number(categoryId),
    });
  }

  // 🎯 VARIANT FILTERS
 const hasVariantFilters =
  colorIds ||
  sizeIds ||
  minPrice ||
  maxPrice ||
  inStock === "true";

if (hasVariantFilters) {
  where.AND.push({
    product_variants: {
      where: {
    is_active: true,
  },
      some: {
        AND: [
          colorIds ? { color_id: { in: colorIds } } : undefined,
          sizeIds ? { size_id: { in: sizeIds } } : undefined,
          minPrice || maxPrice
            ? {
                price: {
                  gte: minPrice ? Number(minPrice) : undefined,
                  lte: maxPrice ? Number(maxPrice) : undefined,
                },
              }
            : undefined,
          inStock === "true"
            ? { stock: { gt: 0 } }
            : undefined,
        ].filter(Boolean),
      },
    },
  });
}

  // 🧠 SORTING
  let orderBy: any = { created_at: "desc" };

  if (sort === "likes") orderBy = { likes: "desc" };
  if (sort === "views") orderBy = { views: "desc" };
  if (sort === "sold") orderBy = { sold_count: "desc" };
  if (sort === "newest") orderBy = { created_at: "desc" };
  if (sort === "discount") orderBy = { discount: "desc" };

  const total = await prisma.products.count({ where });

  const products = await prisma.products.findMany({
    where,
    skip,
    take: limit,
    orderBy,

    include: {
      product_variants: {
        include: {
          colors: true,
          sizes: true,
        },
      },
    },
  });

  return NextResponse.json({
    data: products,
    meta: {
      total,
      page,
      limit,
      hasMore: skip + products.length < total,
    },
  });
}