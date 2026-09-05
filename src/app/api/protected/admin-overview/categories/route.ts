import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getCategoriesCharts } from "./_lib/chart";
import { getCategoriesReport } from "./_lib/report";
import { getCategoriesSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const [summary, report] = await Promise.all([
    getCategoriesSummary(),
    getCategoriesReport(),
  ]);

  const charts = await getCategoriesCharts(summary, report);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
