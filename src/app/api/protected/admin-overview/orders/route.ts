import { NextResponse } from "next/server";

import { withAuth } from "@/src/shared/auth/with-auth";

import { getOrdersCharts } from "./_lib/chart";
import { getOrdersReport } from "./_lib/report";
import { getOrdersSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  // دریافت همزمان خلاصه و گزارش
  const [summary, report] = await Promise.all([
    getOrdersSummary(),
    getOrdersReport(),
  ]);

  // تولید داده‌های نمودار با استفاده از خروجی summary و report
  const charts = await getOrdersCharts(summary, report);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
