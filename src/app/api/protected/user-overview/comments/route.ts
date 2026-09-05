import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

import { getCommentReport } from "./_lib/report";
import { getCommentSummary } from "./_lib/summary";

export const GET = withAuth(
  async (_req, user) => {
    const summary = await getCommentSummary(user.userId);

    const report = await getCommentReport(user.userId);

    return NextResponse.json({
      summary,
      report,
    });
  },
  [1, 2],
);
