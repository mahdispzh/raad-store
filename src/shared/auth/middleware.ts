// shared/auth/middleware.ts

import { prisma } from "@/prisma/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;

  const isProtected =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/dashboard");

  if (!isProtected) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/send-otp", req.url));
  }

  try {
    const payload = verifyToken(token);

    const session = await prisma.auth_sessions.findFirst({
      where: {
        user_id: payload.userId,
        refresh_token_hash: token,
        expires_at: { gt: new Date() },
      },
      include: {
        users: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!session || !session.users) {
      throw new Error("Invalid session");
    }

    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      session.users.role !== 2
    ) {
      return NextResponse.redirect(new URL("/profile/home", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/send-otp", req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"],
};
