import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getCommentsCharts } from "./_lib/chart";
import { getCommentsReport } from "./_lib/report";
import { getCommentsSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const [summary, report] = await Promise.all([
    getCommentsSummary(),
    getCommentsReport(),
  ]);

  const charts = await getCommentsCharts(summary, report);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
