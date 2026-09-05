// shared/auth/with-auth.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { AuthUser } from "./get-user-from-request";
import { getUserFromRequest } from "./get-user-from-request";

type Handler<TParams = any> = (
  req: NextRequest,
  user: AuthUser,
  ctx: { params: TParams },
) => Promise<Response>;

export function withAuth<TParams = any>(
  handler: Handler<TParams>,
  roles?: number[],
) {
  return async (req: NextRequest, ctx: { params: TParams }) => {
    const user = getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (roles && user.role !== undefined) {
      if (!roles.includes(user.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    return handler(req, user, ctx);
  };
}
