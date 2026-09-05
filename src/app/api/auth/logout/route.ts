import { prisma } from "@/prisma/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (refreshToken) {
    await prisma.auth_sessions.deleteMany({
      where: {
        refresh_token_hash: refreshToken,
      },
    });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });

  return res;
}
