import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getOrdersReport } from "./_lib/report";
import { getOrdersSummary } from "./_lib/summary";

export const GET = withAuth(
  async (_req, user) => {
    const [summary, report] = await Promise.all([
      getOrdersSummary(user.userId),
      getOrdersReport(user.userId),
    ]);

    return NextResponse.json({
      summary,
      report,
    });
  },
  [1, 2],
);
