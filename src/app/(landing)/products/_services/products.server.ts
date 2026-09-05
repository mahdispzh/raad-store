/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/prisma/prisma";
import { getCurrentUserId } from "@/src/shared/auth/get-current-user-id";
export interface GetPublicProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  color?: string;
  size?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "likes" | "views" | "sold" | "newest" | "discount";
  providedUserId?: number;
}

export async function getPublicProducts(params: GetPublicProductsParams = {}) {
  const {
    page = 1,
    limit = 10,
    search,
    color,
    size,
    categoryId,
    minPrice,
    maxPrice,
    inStock,
    sort,
    providedUserId,
  } = params;
  const userId = await getCurrentUserId(providedUserId);

  const skip = (page - 1) * limit;

  const colorIds = color?.split(",").map(Number);
  const sizeIds = size?.split(",").map(Number);

  const where: any = {
    status: 1,
    AND: [],
  };

  if (search) {
    where.AND.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (categoryId) {
    where.AND.push({
      category_id: categoryId,
    });
  }

  const hasVariantFilters =
    colorIds ||
    sizeIds ||
    minPrice !== undefined ||
    maxPrice !== undefined ||
    inStock;

  if (hasVariantFilters) {
    where.AND.push({
      is_active: true,
      product_variants: {
        where: {
          is_active: true,
        },
        some: {
          AND: [
            {
              is_active: true,
            },
            colorIds
              ? {
                  color_id: {
                    in: colorIds,
                  },
                }
              : undefined,

            sizeIds
              ? {
                  size_id: {
                    in: sizeIds,
                  },
                }
              : undefined,

            minPrice !== undefined || maxPrice !== undefined
              ? {
                  price: {
                    gte: minPrice,
                    lte: maxPrice,
                  },
                }
              : undefined,

            inStock
              ? {
                  stock: {
                    gt: 0,
                  },
                }
              : undefined,
          ].filter(Boolean),
        },
      },
    });
  }

  let orderBy: any = {
    created_at: "desc",
  };

  if (sort === "likes") orderBy = { likes: "desc" };
  if (sort === "views") orderBy = { views: "desc" };
  if (sort === "sold") orderBy = { sold_count: "desc" };
  if (sort === "discount") orderBy = { discount: "desc" };

  const total = await prisma.products.count({
    where,
  });

  const products = await prisma.products.findMany({
    where,
    skip,
    take: limit,
    orderBy,

    include: {
      likes: userId
        ? {
            where: {
              user_id: userId,
            },
            select: {
              id: true,
            },
          }
        : false,

      product_variants: {
        where: {
          is_active: true,
        },
        include: {
          colors: true,
          sizes: true,
        },
      },
    },
  });
  const ratings = await prisma.ratings.groupBy({
    by: ["product_id"],

    where: {
      product_id: {
        in: products.map((p) => p.id),
      },
    },

    _avg: {
      rating: true,
    },
  });
  const ratingMap = new Map<number, number>();

  ratings.forEach((item) => {
    ratingMap.set(item.product_id, item._avg.rating ?? 0);
  });
  return {
    data: products.map(({ likes, ...product }) => ({
      ...product,
      isLiked: userId ? likes.length > 0 : false,
      averageRating: ratingMap.get(product.id) ?? 0,
    })),

    meta: {
      total,
      page,
      limit,
      hasMore: skip + products.length < total,
    },
  };
}
export async function getPublicProductBySlug(
  slug: string,
  providedUserId?: number,
) {
  const userId = await getCurrentUserId(providedUserId);

  const product = await prisma.products.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  if (!product) {
    return null;
  }

  if (!product) {
    return null;
  }

  await prisma.products.update({
    where: {
      id: product.id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  const productDetails = await prisma.products.findUnique({
    where: {
      id: product.id,
      product_variants: {
        some: {
          is_active: true,
        },
      },
    },

    include: {
      likes: userId
        ? {
            where: {
              user_id: userId,
            },
            select: {
              id: true,
            },
          }
        : false,
      brands: true,
      categories: true,

      features: {
        select: {
          name: true,
          value: true,
        },
      },

      product_variants: {
        where: {
          is_active: true,
        },
        include: {
          colors: true,
          sizes: true,
        },
      },

      ratings: {
        select: {
          id: true,
          rating: true,
          user_id: true,
        },
      },

      comments: {
        where: {
          status: 1,
        },

        orderBy: {
          created_at: "desc",
        },

        select: {
          id: true,
          user_id: true,
          isUnknown: true,
          parent_id: true,
          created_at: true,
          text: true,
          status: true,

          users: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (!productDetails) {
    return null;
  }
  const averageRating =
    productDetails.ratings.length > 0
      ? productDetails.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
        productDetails.ratings.length
      : 0;
  if (!productDetails) {
    return null;
  }

  const ratingMap = new Map<number, number>();

  productDetails.ratings.forEach((rating) => {
    ratingMap.set(rating.user_id, rating.rating);
  });

  return {
    ...productDetails,
    isLiked: userId ? productDetails.likes.length > 0 : false,
    averageRating,
    comments: productDetails.comments.map((comment) => ({
      ...comment,
      rating: ratingMap.get(comment.user_id) ?? null,
    })),
  };
}

export async function getSimilarProducts(
  categoryId: number,
  productId: number,
  limit = 20,
) {
  const products = await prisma.products.findMany({
    where: {
      category_id: categoryId,
      id: { not: productId },
      status: 1,
    },
    take: limit,
    include: {
      product_variants: {
        where: { is_active: true },
        take: 1,
      },
    },
  });
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    productName: p.name,
    imageSrc: p.images?.[0] || "",
    rate: Array.isArray((p as { likes?: unknown[] }).likes)
      ? (p as { likes?: unknown[] }).likes!.length
      : 0,
    price: p.product_variants[0]?.price || 0,
    discount: p.discount,
  }));
}
