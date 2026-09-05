import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user) => {
    const profile = await prisma.users.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        name: true,
        phone: true,
        mail: true,
        role: true,
        created_at: true,
        card_number: true,
        account_number: true,
        sheba_number: true,
        bank_id: true,
        image_id: true,
      },
    });

    return NextResponse.json(profile);
  },
  [1, 2],
);

export const PUT = withAuth(
  async (req, user) => {
    const body = await req.json();

    const profile = await prisma.users.update({
      where: { id: user.userId },
      data: {
        // فقط فیلدهایی که واقعاً ارسال شدن رو آپدیت کن
        ...(body.name !== undefined && { name: body.name }),
        ...(body.mail !== undefined && { mail: body.mail }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.card_number !== undefined && {
          card_number: body.card_number,
        }),
        ...(body.account_number !== undefined && {
          account_number: body.account_number,
        }),
        ...(body.sheba_number !== undefined && {
          sheba_number: body.sheba_number,
        }),
        ...(body.bank_id !== undefined && { bank_id: body.bank_id }),
        ...(body.image_id !== undefined && { image_id: body.image_id }),
      },
      select: {
        id: true,
        name: true,
        phone: true,
        mail: true,
        role: true,
        card_number: true,
        account_number: true,
        sheba_number: true,
        bank_id: true,
        image_id: true,
      },
    });

    return NextResponse.json(profile);
  },
  [1, 2],
);

export const DELETE = withAuth(
  async (req, user) => {
    await prisma.users.delete({ where: { id: user.userId } });
    return NextResponse.json({ success: true });
  },
  [1, 2],
);
