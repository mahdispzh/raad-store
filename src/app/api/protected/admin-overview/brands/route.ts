import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getBrandsCharts } from "./_lib/chart";
import { getBrandsReport } from "./_lib/report";
import { getBrandsSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const [summary, report] = await Promise.all([
    getBrandsSummary(),
    getBrandsReport(),
  ]);

  const charts = await getBrandsCharts(summary, report);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
