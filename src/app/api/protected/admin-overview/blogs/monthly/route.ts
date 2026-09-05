// src/app/api/protected/admin-overview/blogs/monthly/route.ts
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentJalaliYear, getJalaliMonthNumber } from "@/src/shared/utils/analytics";
import { getBlogsMonthlyChartData } from "../_lib/monthly";
// ⚠️ مسیر نسبی "./_lib/monthly" چون این route.ts و پوشه‌ی _lib هر دو
// مستقیم زیر همین پوشه‌ی monthly/ هستن (نه یک پوشه بالاتر، تا با باگی که
// قبلاً توی users/monthly/route.ts پیدا کردیم دوباره تکرار نشه)

export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const yearParam = searchParams.get("year");
  const monthParam = searchParams.get("month");

  if (!monthParam) {
    return NextResponse.json(
      { message: "پارامتر month الزامی است" },
      { status: 400 },
    );
  }

  const year = yearParam ? Number(yearParam) : getCurrentJalaliYear();

  // month می‌تونه عدد (۱ تا ۱۲) یا اسم فارسی ماه ("مرداد") باشه
  const monthNumber = Number.isNaN(Number(monthParam))
    ? getJalaliMonthNumber(monthParam)
    : Number(monthParam);

  if (monthNumber === null || Number.isNaN(monthNumber)) {
    return NextResponse.json(
      { message: "پارامتر month نامعتبر است" },
      { status: 400 },
    );
  }

  const chart = await getBlogsMonthlyChartData(year, monthNumber);
  return NextResponse.json(chart);
}, [2]);