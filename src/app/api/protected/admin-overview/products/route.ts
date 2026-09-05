import { withAuth } from "@/src/shared/auth/with-auth";
import { NextRequest, NextResponse } from "next/server";

import { getProductsCharts } from "./_lib/chart";
import {
  getProductsReport,
  getTopSellingProductsForJalaaliMonth,
  getBottomSellingProductsForJalaaliMonth,
} from "./_lib/report";
import { getProductsSummary } from "./_lib/summary";

export const GET = withAuth(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const [summary, report] = await Promise.all([
    getProductsSummary(),
    getProductsReport(),
  ]);

  const charts = await getProductsCharts({ summary, report });

  // ✅ جدید — پرفروش‌ترین و کم‌فروش‌ترین محصولات یک ماه شمسی خاص، فقط اگه year/month پاس داده بشه
  let topSellingMonthly = null;
  let bottomSellingMonthly = null;

  if (year && month) {
    const jalaaliYear = parseInt(year, 10);
    const jalaaliMonth = parseInt(month, 10);

    if (
      !isNaN(jalaaliYear) &&
      !isNaN(jalaaliMonth) &&
      jalaaliMonth >= 1 &&
      jalaaliMonth <= 12
    ) {
      [topSellingMonthly, bottomSellingMonthly] = await Promise.all([
        getTopSellingProductsForJalaaliMonth(jalaaliYear, jalaaliMonth),
        getBottomSellingProductsForJalaaliMonth(jalaaliYear, jalaaliMonth),
      ]);
    }
  }

  return NextResponse.json({
    summary,
    report,
    charts,
    topSellingMonthly,
    bottomSellingMonthly,
  });
}, [2]);