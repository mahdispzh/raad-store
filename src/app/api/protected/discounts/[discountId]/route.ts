import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ discountId: string }>;
};

export const GET = withAuth(
  async (req, user, ctx?: Params) => {
    const { discountId } = await ctx!.params;

    const discount = await prisma.discounts.findUnique({
      where: {
        id: Number(discountId),
      },
    });

    return NextResponse.json(discount);
  },
  [2],
);

export const PUT = withAuth(
  async (req, user, ctx?: Params) => {
    const { discountId } = await ctx!.params;
    const body = await req.json();

    const discount = await prisma.discounts.update({
      where: {
        id: Number(discountId),
      },
      data: {
        code: body.code,
        type: body.type,
        value: body.value,
      },
    });

    return NextResponse.json(discount);
  },
  [2],
);

export const DELETE = withAuth(
  async (req, user, ctx?: Params) => {
    const { discountId } = await ctx!.params;

    await prisma.discounts.delete({
      where: {
        id: Number(discountId),
      },
    });

    return NextResponse.json({ success: true });
  },
  [2],
);
