import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getAddressReport } from "./_lib/report";
import { getAddressSummary } from "./_lib/summary";

export const GET = withAuth(
  async (_req, user) => {
    const summary = await getAddressSummary(user.userId);

    const report = await getAddressReport(user.userId);

    return NextResponse.json({
      summary,
      report,
    });
  },
  [1, 2],
);
