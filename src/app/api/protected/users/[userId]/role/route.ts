import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const PATCH = withAuth(
  async (req) => {
    const body = await req.json();

    const userId = Number(req.nextUrl.pathname.split("/")[4]);

    const user = await prisma.users.update({
      where: {
        id: userId,
      },

      data: {
        role: body.role,
      },
    });

    return NextResponse.json(user);
  },
  [2],
);
