import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";
import { getAddressCharts } from "./_lib/chart";
import { getAddressReport } from "./_lib/report";
import { getAddressSummary } from "./_lib/summary";

export const GET = withAuth(async () => {
  const [summary, report] = await Promise.all([
    getAddressSummary(),
    getAddressReport(),
  ]);

  const charts = await getAddressCharts(summary, report);

  return NextResponse.json({
    summary,
    report,
    charts,
  });
}, [2]);
