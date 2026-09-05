import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(async (request, user) => {
  const limit = Math.min(Math.max(Number(new URL(request.url).searchParams.get("limit")) || 20, 1), 100);
  const notifications = await prisma.notifications.findMany({
    where: { user_id: user.userId },
    orderBy: { created_at: "desc" },
    take: limit,
  });

  return NextResponse.json(notifications);
});

export const PATCH = withAuth(async (_request, user) => {
  await prisma.notifications.updateMany({
    where: { user_id: user.userId, is_read: false },
    data: { is_read: true, read_at: new Date() },
  });

  return NextResponse.json({ success: true });
});
