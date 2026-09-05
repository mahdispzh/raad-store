/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user, ctx: any) => {   // ✅ سه پارامتر
    const { paymentId } = await ctx.params;

    const payment = await prisma.payments.findUnique({
      where: { id: Number(paymentId) },
      include: {
        orders: true,
      },
    });

    return NextResponse.json(payment);
  },
  [2],
);
export const PUT = withAuth(
  async (req, user, ctx: any) => {   // ✅ سه پارامتر
    const { paymentId } = await ctx.params;
    const body = await req.json();

    const payment = await prisma.payments.update({
      where: { id: Number(paymentId) },
      data: {
        status: body.status,
        transaction_code: body.transactionCode,
        paid_at: body.paidAt,
      },
    });

    return NextResponse.json(payment);
  },
  [1,2],
);
export const DELETE = withAuth(
  async (req, user, ctx: any) => {   // ✅ سه پارامتر
    const { paymentId } = await ctx.params;

    await prisma.payments.delete({
      where: { id: Number(paymentId) },
    });

    return NextResponse.json({ success: true });
  },
  [2],
);
