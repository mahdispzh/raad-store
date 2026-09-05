import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(async () => {
  const report = await prisma.orders.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const data = {
    pending: 0, // 0
    confirmed: 0, // 1
    preparing: 0, // 2
    readyToShip: 0, // 3
    shipped: 0, // 4
    delivered: 0, // 5
    returned: 0, // 6
    total: 0,
  };

  report.forEach((item) => {
    data.total += item._count.status;

    switch (item.status) {
      case 0:
        data.pending = item._count.status;
        break;

      case 1:
        data.confirmed = item._count.status;
        break;

      case 2:
        data.preparing = item._count.status;
        break;

      case 3:
        data.readyToShip = item._count.status;
        break;

      case 4:
        data.shipped = item._count.status;
        break;

      case 5:
        data.delivered = item._count.status;
        break;

      case 6:
        data.returned = item._count.status;
        break;
    }
  });

  return NextResponse.json({
    data,
  });
}, [2]);
