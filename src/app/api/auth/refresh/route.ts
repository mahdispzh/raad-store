import { prisma } from "@/prisma/prisma";

import { signAccessToken, verifyToken } from "@/src/shared/auth/jwt";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("step1:", refreshToken);
  // 1. cookie check
  if (!refreshToken) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    // 2. jwt verify
    const payload = verifyToken(refreshToken);

    // 3. DB session check
    const session = await prisma.auth_sessions.findFirst({
      where: {
        user_id: payload.userId,

        refresh_token_hash: refreshToken,
      },

      include: {
        users: {
          select: {
            id: true,
            role: true,
            name: true,
          },
        },
      },
    });
    console.log("step2:", session);

    if (!session || session.expires_at < new Date()) {
      return NextResponse.json(
        {
          error: "Session expired",
        },
        {
          status: 401,
        },
      );
    }

    // 4. create new access token only, keep the refresh token stable
    const newAccessToken = signAccessToken({
      userId: session.users.id,
      role: session.users.role,
      name: session.users.name,
    });

    const renewedExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // 5. DB update: keep refresh_token_hash unchanged, extend the server-side session
    await prisma.auth_sessions.update({
      where: {
        id: session.id,
      },
      data: {
        expires_at: renewedExpiresAt,
      },
    });

    // 6. response
    const response = NextResponse.json({
      accessToken: newAccessToken,
      user: {
        id: session.users.id,
        role: session.users.role,
        name: session.users.name,
      },
    });

    // 7. refresh cookie unchanged, but re-set expiration to keep browser cookie alive
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        error: "Invalid token",
      },
      {
        status: 401,
      },
    );
  }
}
