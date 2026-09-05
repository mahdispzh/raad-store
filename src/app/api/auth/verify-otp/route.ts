import { prisma } from "@/prisma/prisma";
import { signAccessToken, signRefreshToken } from "@/src/shared/auth/jwt";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone, code } = await req.json();

  // 1. پیدا کردن آخرین کد فعال (استفاده‌نشده)
  const otp = await prisma.otp_codes.findFirst({
    where: { phone, used_at: null },
    orderBy: { created_at: "desc" },
  });

  // 2. اعتبارسنجی
  if (!otp || otp.expires_at < new Date()) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  if (otp.attempts >= 5) {
    return NextResponse.json(
      { error: "تعداد تلاش‌های مجاز تمام شد" },
      { status: 429 },
    );
  }

  const isValid = await bcrypt.compare(code, otp.otp_hash);

  if (!isValid) {
    await prisma.otp_codes.update({
      where: { id: otp.id },
      data: { attempts: { increment: 1 } },
    });
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  // 3. پیدا کردن یا ساختن کاربر
  let isNewUser = false;

  let user = await prisma.users.findUnique({
    where: { phone },
    include: { carts: true },
  });

  if (!user) {
    isNewUser = true;
    user = await prisma.users.create({
      data: {
        phone,
        role: 1,
        carts: { create: { created_at: new Date() } },
      },
      include: { carts: true },
    });
  }

  // 4. تولید توکن‌ها
  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role,
    name: user.name,
  });

  const refreshToken = signRefreshToken({
    userId: user.id,
    role: user.role,
    name: user.name,
  });

  const sessionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  // 5. چرخش سشن
  const existingSession = await prisma.auth_sessions.findFirst({
    where: { user_id: user.id },
  });

  if (existingSession) {
    await prisma.auth_sessions.update({
      where: { id: existingSession.id },
      data: { refresh_token_hash: refreshToken, expires_at: sessionExpiresAt },
    });
  } else {
    await prisma.auth_sessions.create({
      data: {
        user_id: user.id,
        refresh_token_hash: refreshToken,
        expires_at: sessionExpiresAt,
        created_at: new Date(),
      },
    });
  }

  // 6. کد رو مصرف‌شده علامت بزن (به‌جای حذف کامل)
  await prisma.otp_codes.update({
    where: { id: otp.id },
    data: { used_at: new Date() },
  });

  // 7. پاسخ
  const redirectMap: Record<number, string> = {
    1: "/profile",
    2: "/dashboard",
  };
  const redirectTo = redirectMap[user.role] ?? "/profile";

  const response = NextResponse.json({
    accessToken,
    user,
    redirectTo,
    isNewUser,
  });

  // 8. کوکی
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
