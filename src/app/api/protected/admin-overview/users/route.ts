import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getUserCharts } from "./_lib/chart";
import { getUserReport } from "./_lib/report";
import { getUserSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const summary = await getUserSummary();

  const report = await getUserReport();

  const charts = await getUserCharts(summary, report);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
