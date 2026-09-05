import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ addressId: string }>;
};

export const GET = withAuth(
  async (req, user, ctx?: Params) => {
    const { addressId } = await ctx!.params;

    const address = await prisma.user_addresses.findFirst({
      where: {
        id: Number(addressId),
        user_id: user.userId,
      },
    });

    return NextResponse.json(address);
  },
  [1, 2],
);

export const PUT = withAuth(
  async (req, user, ctx?: Params) => {
    const { addressId } = await ctx!.params;
    const body = await req.json();

    const address = await prisma.user_addresses.update({
      where: { id: Number(addressId) },
      data: {
        title: body.title,
        province: body.province,
        city: body.city,
        address: body.address,
        postal_code: body.postalCode,
        receiver_name: body.receiverName,
        receiver_phone: body.receiverPhone,
        default: body.default,
      },
    });

    return NextResponse.json(address);
  },
  [1, 2],
);

export const DELETE = withAuth(
  async (req, user, ctx?: Params) => {
    const { addressId } = await ctx!.params;

    await prisma.user_addresses.delete({
      where: { id: Number(addressId) },
    });

    return NextResponse.json({ success: true });
  },
  [1, 2],
);
