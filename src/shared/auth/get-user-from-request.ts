// shared/auth/get-user-from-request.ts
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export type AuthUser = {
  name: string;
  userId: number;
  role?: number;
};

export function getUserFromRequest(req: NextRequest): AuthUser | null {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("userId" in payload)
    ) {
      return null;
    }

    return payload as AuthUser;
  } catch {
    return null;
  }
}
