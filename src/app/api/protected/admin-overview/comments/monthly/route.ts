// src/app/api/protected/admin-overview/comments/monthly/route.ts
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentJalaliYear, getJalaliMonthNumber } from "@/src/shared/utils/analytics";
import { getCommentsMonthlyChartData } from "../_lib/monthly";

export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const yearParam = searchParams.get("year");
  const monthParam = searchParams.get("month");

  if (!monthParam) {
    return NextResponse.json(
      { message: "پارامتر month الزامی است" },
      { status: 400 }
    );
  }

  const year = yearParam ? Number(yearParam) : getCurrentJalaliYear();
  const monthNumber = Number.isNaN(Number(monthParam))
    ? getJalaliMonthNumber(monthParam)
    : Number(monthParam);

  if (monthNumber === null || Number.isNaN(monthNumber)) {
    return NextResponse.json(
      { message: "پارامتر month نامعتبر است" },
      { status: 400 }
    );
  }

  const chart = await getCommentsMonthlyChartData(year, monthNumber);
  return NextResponse.json(chart);
}, [2]);