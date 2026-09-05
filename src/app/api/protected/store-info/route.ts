import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(async () => {
  try {
    let info = await prisma.store_information.findFirst();

    if (!info) {
      info = await prisma.store_information.create({ data: {} });
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error("❌ خطا در GET اطلاعات فروشگاه:", error);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات فروشگاه" },
      { status: 500 },
    );
  }
}, [1, 2]);

export const PUT = withAuth(
  async (req) => {
    try {
      const body = await req.json();

      // ابتدا ردیف موجود رو پیدا کن
      let existing = await prisma.store_information.findFirst();

      let info;
      if (existing) {
        info = await prisma.store_information.update({
          where: { id: existing.id },
          data: body,
        });
      } else {
        info = await prisma.store_information.create({ data: body });
      }

      return NextResponse.json(info);
    } catch (error) {
      console.error("❌ خطا در PUT اطلاعات فروشگاه:", error);
      return NextResponse.json(
        { error: "خطا در به‌روزرسانی اطلاعات فروشگاه" },
        { status: 500 },
      );
    }
  },
  [1, 2],
);
