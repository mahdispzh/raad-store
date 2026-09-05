// app/api/auth/me/route.ts

import { prisma } from "@/prisma/prisma";
import { verifyToken } from "@/src/shared/auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(refreshToken);

    const session = await prisma.auth_sessions.findFirst({
      where: {
        user_id: payload.userId,
        refresh_token_hash: refreshToken,
        expires_at: { gt: new Date() },
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            phone: true,
            mail: true,
            role: true,
          },
        },
      },
    });

    if (!session?.users) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(session.users);
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
