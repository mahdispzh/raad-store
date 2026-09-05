import { prisma } from "@/prisma/prisma";

export async function getOrdersReport(id: number) {
  const [
    latestOrders,

    highestPriceOrders,
    frequentProducts,
    pendingOrderList,

    deliveredOrderList,

    returnedOrderList,
  ] = await Promise.all([
    prisma.orders.findMany({
      where: {
        user_id: id,
      },
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      include: {
        payments: true,
        order_items: {
          include: {
            products: true,
            product_variants: {
              include: {
                colors: true,
                sizes: true,
              },
            },
          },
        },
      },
    }),

    prisma.orders.findMany({
      where: {
        user_id: id,
      },
      take: 10,
      orderBy: {
        total_price: "desc",
      },
      include: {
        payments: true,
      },
    }),

    (async () => {
      const stats = await prisma.order_items.groupBy({
        by: ["product_id"],
        where: {
          orders: {
            user_id: id,
            status: 6,
          },
        },
        _sum: {
          quantity: true,
        },
        _count: {
          product_id: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 10,
      });

     const products = await prisma.products.findMany({
  where: { id: { in: stats.map((x) => x.product_id) } },
  select: {
    id: true,
    name: true,
    slug: true,
    images: true,
    discount: true,
    product_variants: {
      select: { price: true },
      orderBy: { price: "asc" },
      take: 1,
    },
  },
});

return stats.map((item) => {
  const product = products.find((p) => p.id === item.product_id);
  return {
    ...product,
    price: product?.product_variants[0]?.price ?? 0,
    totalQuantity: item._sum.quantity ?? 0,
    orderCount: item._count.product_id,
  };
});
    })(),
    prisma.orders.findMany({
      where: {
        user_id: id,
        status: 0,
      },
      include: {
        payments: true,
      },
    }),

    prisma.orders.findMany({
      where: {
        user_id: id,
        status: 5,
      },
      include: {
        payments: true,
      },
    }),

    prisma.orders.findMany({
      where: {
        user_id: id,
        status: 6,
      },
      include: {
        payments: true,
      },
    }),
  ]);

  return {
    latestOrders,

    highestPriceOrders,
    frequentProducts,
    pendingOrderList,

    deliveredOrderList,

    returnedOrderList,
  };
}
/**
 * خروجی گزارش سفارش‌های کاربر
 *
 * latestOrders
 * آخرین سفارش‌های ثبت‌شده توسط کاربر
 *
 * highestPriceOrders
 * گران‌ترین سفارش‌های کاربر بر اساس مبلغ سفارش
 *
 * frequentProducts
 * محصولاتی که کاربر بیشترین تعداد از آن‌ها را خریداری کرده است
 *
 * pendingOrderList
 * لیست سفارش‌های در انتظار تایید
 *
 * deliveredOrderList
 * لیست سفارش‌های تحویل‌شده به کاربر
 *
 * returnedOrderList
 * لیست سفارش‌های مرجوع‌شده
 */
