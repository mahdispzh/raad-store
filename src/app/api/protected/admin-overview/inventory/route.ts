import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getProductVariantsCharts } from "./_lib/chart";
import { getProductVariantsReport } from "./_lib/report";
import { getProductVariantsSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const [summary, report] = await Promise.all([
    getProductVariantsSummary(),
    getProductVariantsReport(),
  ]);

  const charts = await getProductVariantsCharts(summary, report);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
