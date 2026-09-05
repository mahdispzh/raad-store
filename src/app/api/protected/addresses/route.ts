import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user) => {
    const searchParams = req.nextUrl.searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const total = await prisma.user_addresses.count({
      where: {
        user_id: user.userId,
      },
    });

    const addresses = await prisma.user_addresses.findMany({
      where: {
        user_id: user.userId,
      },
      skip,
      take: limit,
    });

    const hasMore = skip + addresses.length < total;

    return NextResponse.json({
      data: addresses,
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

    const address = await prisma.user_addresses.create({
      data: {
        user_id: user.userId,
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
