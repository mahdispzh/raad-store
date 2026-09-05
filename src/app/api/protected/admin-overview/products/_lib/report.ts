import { prisma } from "@/prisma/prisma";
import { jalaliMonthRangeFor } from "@/src/shared/utils/analytics";

export async function getProductsReport() {
  const [
    topSellingProducts,
    topViewedProducts,
    topLikedProducts,
    newestProducts,
    outOfStockProducts,
    lowStockProducts,
    productsWithoutSales,
    productsWithoutViews,
    productsWithoutLikes,
  ] = await Promise.all([
    prisma.products.findMany({
      take: 10,
      orderBy: {
        sold_count: "desc",
      },
      select: {
        id: true,
        name: true,
        sold_count: true,
        views: true,
        discount: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      take: 10,
      orderBy: {
        views: "desc",
      },
      select: {
        id: true,
        name: true,
        views: true,
        sold_count: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      take: 10,
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      select: {
        id: true,
        name: true,
        images: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    }),

    prisma.products.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      where: {
        product_variants: {
          some: {
            stock: 0,
          },
        },
      },
      take: 10,
      select: {
        id: true,
        name: true,
        images: true,
        product_variants: {
          select: {
            stock: true,
          },
        },
      },
    }),

    prisma.products.findMany({
      where: {
        product_variants: {
          some: {
            stock: {
              gt: 0,
              lte: 5,
            },
          },
        },
      },
      take: 10,
      select: {
        id: true,
        name: true,
        images: true,
        product_variants: {
          select: {
            stock: true,
          },
        },
      },
    }),

    prisma.products.findMany({
      where: {
        OR: [
          {
            sold_count: 0,
          },
          {
            sold_count: null,
          },
        ],
      },
      take: 10,
      select: {
        id: true,
        name: true,
        sold_count: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      where: {
        OR: [
          {
            views: 0,
          },
          {
            views: null,
          },
        ],
      },
      take: 10,
      select: {
        id: true,
        name: true,
        views: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      where: {
        likes: {
          none: {},
        },
      },
      take: 10,
      select: {
        id: true,
        name: true,
        images: true,
      },
    }),
  ]);

  return {
    topSellingProducts,
    topViewedProducts,
    topLikedProducts,
    newestProducts,
    outOfStockProducts,
    lowStockProducts,
    productsWithoutSales,
    productsWithoutViews,
    productsWithoutLikes,
  };
}
/**
 * دریافت گزارش‌های داشبورد محصولات
 *
 * خروجی:
 * - topSellingProducts: ۱۰ محصول با بیشترین فروش
 * - topViewedProducts: ۱۰ محصول با بیشترین بازدید
 * - topLikedProducts: ۱۰ محصول با بیشترین تعداد لایک
 * - newestProducts: ۱۰ محصول جدید
 * - outOfStockProducts: ۱۰ محصول دارای تنوع ناموجود
 * - lowStockProducts: ۱۰ محصول دارای تنوع با موجودی کم
 * - productsWithoutSales: ۱۰ محصول بدون فروش
 * - productsWithoutViews: ۱۰ محصول بدون بازدید
 * - productsWithoutLikes: ۱۰ محصول بدون لایک
 */

// ✅ جدید — پرفروش‌ترین محصولات یک ماه شمسی خاص، بر اساس فروش واقعی
// (مجموع quantity در order_items همون بازه، نه products.sold_count که کل‌زمانیه)
export interface TopSellingMonthlyItem {
  id: number;
  name: string;
  image: string;
  count: number;
}

export interface TopSellingMonthlyResult {
  jalaaliYear: number;
  jalaaliMonth: number;
  items: TopSellingMonthlyItem[];
}

export async function getTopSellingProductsForJalaaliMonth(
  jalaaliYear: number,
  jalaaliMonth: number,
): Promise<TopSellingMonthlyResult> {
  const { start, end } = jalaliMonthRangeFor(jalaaliYear, jalaaliMonth);

  const grouped = await prisma.order_items.groupBy({
    by: ["product_id"],
    _sum: { quantity: true },
    where: {
      created_at: { gte: start, lt: end },
    },
    orderBy: {
      _sum: { quantity: "desc" },
    },
    take: 10,
  });

  const productIds = grouped.map((g) => g.product_id);

  const products = await prisma.products.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true, images: true },
  });

  const productsMap = new Map(products.map((p) => [p.id, p]));

  const items: TopSellingMonthlyItem[] = grouped.flatMap((g) => {
    const product = productsMap.get(g.product_id);
    if (!product) return [];

    return [
      {
        id: product.id,
        name: product.name,
        image: product.images[0] ?? "",
        count: g._sum.quantity ?? 0,
      },
    ];
  });

  return { jalaaliYear, jalaaliMonth, items };
}

// ✅ جدید — کم‌فروش‌ترین محصولات یک ماه شمسی خاص
// بر خلاف تابع بالا، اینجا با LEFT JOIN محصولات بدون هیچ فروشی (quantity=0) هم لحاظ می‌شن
export interface BottomSellingMonthlyItem {
  id: number;
  name: string;
  image: string;
  count: number;
}

export interface BottomSellingMonthlyResult {
  jalaaliYear: number;
  jalaaliMonth: number;
  items: BottomSellingMonthlyItem[];
}

export async function getBottomSellingProductsForJalaaliMonth(
  jalaaliYear: number,
  jalaaliMonth: number,
): Promise<BottomSellingMonthlyResult> {
  const { start, end } = jalaliMonthRangeFor(jalaaliYear, jalaaliMonth);

  const rows = await prisma.$queryRaw<
    {
      id: number;
      name: string;
      image: string | null;
      count: number;
    }[]
  >`
    SELECT
      p.id AS id,
      p.name AS name,
      p.images[1] AS image,
      COALESCE(SUM(oi.quantity), 0)::int AS count
    FROM products p
    LEFT JOIN order_items oi
      ON oi.product_id = p.id
      AND oi.created_at >= ${start}
      AND oi.created_at < ${end}
    GROUP BY p.id, p.name, p.images
    ORDER BY count ASC, p.id ASC
    LIMIT 10;
  `;

  const items: BottomSellingMonthlyItem[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    image: r.image ?? "",
    count: r.count,
  }));

  return { jalaaliYear, jalaaliMonth, items };
}

// ✅ جدید — آخرین محصولات برای جدول داشبورد محصولات (عکس، نام، قیمت، موجودی، وضعیت)
export async function getLatestProductsForTable(limit = 4) {
  const products = await prisma.products.findMany({
    take: limit,
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      name: true,
      images: true,
      product_variants: {
        select: {
          stock: true,
          price: true,
        },
      },
    },
  });

  return products.map((p) => {
    const totalStock = p.product_variants.reduce(
      (sum, v) => sum + v.stock,
      0,
    );

    const prices = p.product_variants
      .map((v) => v.price)
      .filter((price): price is number => price !== null && price !== undefined);

    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

    return {
      id: p.id,
      name: p.name,
      image: p.images?.[0] ?? "",
      price: minPrice,
      stock: totalStock,
      status: (totalStock > 0 ? "available" : "unavailable") as
        | "available"
        | "unavailable",
    };
  });
}