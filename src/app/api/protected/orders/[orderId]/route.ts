// app/api/protected/orders/[orderId]/route.ts
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { notifyOrderStatusChanged } from "@/src/shared/notifications/notification.service";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ orderId: string }>;
};

export const GET = withAuth(
  async (req, user, ctx?: Params) => {
    const { orderId } = await ctx!.params;

    const order = await prisma.orders.findFirst({
      where: {
        id: Number(orderId),
        user_id: user.userId, // ownership check
      },
      include: {
        // ✅ products (با برند و ویژگی‌ها) و product_variants (با رنگ و سایز)
        // زیر هر order_item برمی‌گردند
        order_items: {
          include: {
            products: {
              include: { brands: true, features: true },
            },
            product_variants: {
              include: { colors: true, sizes: true },
            },
          },
        },
        payments: true,
        user_addresses: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  },
  [1, 2],
);

export const PUT = withAuth(
  async (req, user, ctx?: Params) => {
    const { orderId } = await ctx!.params;
    const body = await req.json();

    if (user.role !== 2) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const previousOrder = await prisma.orders.findUnique({
      where: { id: Number(orderId) },
      select: { id: true, user_id: true, status: true },
    });

    if (!previousOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = await prisma.orders.update({
      where: { id: Number(orderId) },
      data: {
        status: body.status,
        payment_status: body.paymentStatus,
      },
    });

    if (body.status !== undefined && previousOrder.status !== order.status) {
      await notifyOrderStatusChanged(order);
    }

    return NextResponse.json(order);
  },
  [1, 2],
);
