import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";
import { getBlogsCharts } from "./_lib/chart";
import { getBlogsReport } from "./_lib/report";
import { getBlogsSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const [summary, report] = await Promise.all([
    getBlogsSummary(),
    getBlogsReport(),
  ]);

  const charts = await getBlogsCharts(summary, report);
  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
