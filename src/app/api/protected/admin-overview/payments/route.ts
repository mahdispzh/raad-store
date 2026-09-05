import { NextRequest, NextResponse } from "next/server";

import { withAuth } from "@/src/shared/auth/with-auth";

import { getPaymentsCharts } from "./_lib/chart";
import { getPaymentsReport } from "./_lib/report";
import { getPaymentsSummary } from "./_lib/summary";

export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const [summary, report] = await Promise.all([
    getPaymentsSummary(),
    getPaymentsReport(),
  ]);

  // ✅ جدید — incomeByDay برای LineChart، فقط اگه year/month پاس داده بشه
  let jalaaliMonth: { jy: number; jm: number } | undefined;

  if (year && month) {
    const jy = parseInt(year, 10);
    const jm = parseInt(month, 10);

    if (!isNaN(jy) && !isNaN(jm) && jm >= 1 && jm <= 12) {
      jalaaliMonth = { jy, jm };
    }
  }

  const charts = await getPaymentsCharts(summary, report, jalaaliMonth);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);