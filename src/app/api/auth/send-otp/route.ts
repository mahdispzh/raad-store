import { prisma } from "@/prisma/prisma";
import { EASY_LOGIN } from "@/src/shared/config/auth.config";
import { sendOtpSms } from "@/src/shared/services/sms/kavenegar";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { message: "شماره موبایل نامعتبر است" },
        { status: 400 },
      );
    }

    // ⬇️ تولید کد بسته به حالت EASY_LOGIN
    const code = EASY_LOGIN
      ? phone.slice(-4) // ۴ رقم آخر شماره موبایل
      : Math.floor(1000 + Math.random() * 9000).toString(); // کد تصادفی

    const otpHash = await bcrypt.hash(code, 10);

    await prisma.otp_codes.create({
      data: {
        phone,
        otp_hash: otpHash,
        expires_at: new Date(Date.now() + 2 * 60 * 1000),
      },
    });

    if (EASY_LOGIN) {
      // ⬇️ هیچ پیامکی ارسال نمی‌شود — فقط برای دیباگ لاگ می‌شود
      console.log(`🔓 EASY_LOGIN فعال است — کد ورود برای ${phone}: ${code}`);
    } else {
      await sendOtpSms(phone, code);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ خطا در ارسال کد:", error);
    return NextResponse.json(
      { message: "خطا در ارسال کد تایید" },
      { status: 500 },
    );
  }
}
