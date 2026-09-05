import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ notificationId: string }> };

export const PATCH = withAuth(async (_request, user, context?: Params) => {
  const { notificationId } = await context!.params;
  const result = await prisma.notifications.updateMany({
    where: { id: Number(notificationId), user_id: user.userId },
    data: { is_read: true, read_at: new Date() },
  });

  if (!result.count) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
});

export const DELETE = withAuth(async (_request, user, context?: Params) => {
  const { notificationId } = await context!.params;
  const result = await prisma.notifications.deleteMany({
    where: { id: Number(notificationId), user_id: user.userId },
  });

  if (!result.count) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
});
