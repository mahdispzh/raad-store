import type { Prisma } from "@/prisma/generated/prisma/client";
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const search = searchParams.get("search")?.trim();

    const status = searchParams.get("status");

    const paymentMethod = searchParams.get("paymentMethod");

    const minAmount = searchParams.get("minAmount");
    const maxAmount = searchParams.get("maxAmount");

    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");

    const skip = (page - 1) * limit;

    const filters: Prisma.paymentsWhereInput[] = [];

    /**
     * Search
     *
     * جستجو بر اساس:
     * - کد تراکنش
     * - شماره سفارش
     */
    if (search) {
      const searchNumber = Number(search);

      filters.push({
        OR: [
          {
            transaction_code: {
              contains: search,
              mode: "insensitive",
            },
          },

          ...(Number.isInteger(searchNumber)
            ? [
                {
                  order_id: searchNumber,
                },
              ]
            : []),
        ],
      });
    }

    /**
     * Payment Status Filter
     *
     * وضعیت پرداخت:
     * 0 = در انتظار
     * 1 = موفق
     * 2 = ناموفق
     * 3 = نامشخص 
     */
    if (status) {
      filters.push({
        status: Number(status),
      });
    }

    /**
     * Payment Method Filter
     *
     * مثال:
     * online
     * cash
     */
    if (paymentMethod) {
      filters.push({
        payment_method: paymentMethod,
      });
    }

    /**
     * Amount Filter
     *
     * حداقل و حداکثر مبلغ
     */
    if (minAmount || maxAmount) {
      filters.push({
        amount: {
          ...(minAmount
            ? {
                gte: Number(minAmount),
              }
            : {}),

          ...(maxAmount
            ? {
                lte: Number(maxAmount),
              }
            : {}),
        },
      });
    }

    /**
     * Date Filter
     *
     * بازه زمانی پرداخت
     */
    if (fromDate || toDate) {
      filters.push({
        created_at: {
          ...(fromDate
            ? {
                gte: new Date(fromDate),
              }
            : {}),

          ...(toDate
            ? {
                lte: new Date(toDate),
              }
            : {}),
        },
      });
    }

    const where: Prisma.paymentsWhereInput = {
      AND: filters,
    };

    const [total, payments] = await Promise.all([
      prisma.payments.count({
        where,
      }),

      prisma.payments.findMany({
        where,

        include: {
          orders: true,
        },

        skip,

        take: limit,

        orderBy: {
          created_at: "desc",
        },
      }),
    ]);

    const hasMore = skip + payments.length < total;

    return NextResponse.json({
      data: payments,

      meta: {
        total,
        page,
        limit,
        hasMore,
      },
    });
  },
  [2],
);

export const POST = withAuth(
  async (req) => {
    const body = await req.json();

    const payment = await prisma.payments.create({
      data: {
        order_id: body.orderId,
        amount: body.amount,
        payment_method: body.paymentMethod,
        status: body.status,
        transaction_code: body.transactionCode,
        paid_at: body.paidAt ?? null,
      },
    });

    return NextResponse.json(payment);
  },
  [1, 2],
);
