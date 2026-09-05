/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/protected/orders/me/route.ts
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { notifyOrderCreated } from "@/src/shared/notifications/notification.service";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const total = await prisma.orders.count({
      where: {
        user_id: user.userId,
      },
    });

    const orders = await prisma.orders.findMany({
      where: {
        user_id: user.userId,
      },
      include: {
        order_items: {
          include: {
            products: true, // ✅ بدون این، اسم/عکس محصول به فرانت نمی‌رسه
            product_variants: {
              include: { colors: true, sizes: true }, // ✅ برای رنگ/سایز هر آیتم
            },
          },
        },
        payments: true,
        user_addresses: true,
      },
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
    });

    const hasMore = skip + orders.length < total;

    return NextResponse.json({
      data: orders,
      meta: {
        total,
        page,
        limit,
        hasMore,
      },
    });
  },
  [1, 2],
);

export const POST = withAuth(
  async (req, user) => {
    const body = await req.json();

    const order = await prisma.orders.create({
      data: {
        user_id: user.userId,
        cart_id: body.cartId,
        address_id: body.addressId,
        total_price: body.totalPrice,
        status: 0,
        payment_status: 0,
        order_items: {
          create: body.items.map((item: any) => ({
            product_id: item.productId,
            variant_id: item.variantId,
            unit_price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        order_items: {
          include: {
            products: true,
            product_variants: {
              include: { colors: true, sizes: true },
            },
          },
        },
      },
    });

    await notifyOrderCreated(order);

    return NextResponse.json(order);
  },
  [1, 2],
);
