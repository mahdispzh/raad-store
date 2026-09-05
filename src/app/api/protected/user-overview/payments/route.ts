import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getPaymentsReport } from "./_lib/report";
import { getPaymentsSummary } from "./_lib/summary";

export const GET = withAuth(
  async (_req, user) => {
    const [summary, report] = await Promise.all([
      getPaymentsSummary(user.userId),
      getPaymentsReport(user.userId),
    ]);

    return NextResponse.json({
      summary,
      report,
    });
  },
  [1, 2],
);
