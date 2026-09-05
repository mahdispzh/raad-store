import { withAuth } from "@/src/shared/auth/with-auth";
import { NextRequest, NextResponse } from "next/server";
import { getCategoriesMonthlyChartData } from "../_lib/monthly";

export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const jy = Number(searchParams.get("year"));
  const jm = Number(searchParams.get("month"));

  if (!jy || !jm) {
    return NextResponse.json(
      { error: "year و month الزامی هستند" },
      { status: 400 },
    );
  }

  const data = await getCategoriesMonthlyChartData(jy, jm);
  return NextResponse.json(data);
}, [2]);