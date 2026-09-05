// app/api/protected/payments/pay-request/route.ts
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";
import ZarinpalPayment from "zarinpal-pay";

export const POST = withAuth(
  async (req, user) => {
const body = await req.json();
const { orderId, sendingMethod } = body;

    const merchantId = process.env.MERCHANT_ID;
    if (!merchantId) {
      return NextResponse.json(
        { message: "MERCHANT_ID is not defined" },
        { status: 500 },
      );
    }

    const order = await prisma.orders.findFirst({
      where: { id: Number(orderId), user_id: user.userId },
    });

    if (!order) {
      return NextResponse.json({ message: "سفارش یافت نشد" }, { status: 404 });
    }

    const zarinpal = new ZarinpalPayment(merchantId, { isSandbox: true });

    let createTransaction;
    try {
      createTransaction = await zarinpal.create({
        amount: order.total_price,
  callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/payment`, // ⬅️ تغییر کرد
        description: `پرداخت سفارش #${order.id}`,
        order_id: String(order.id),
      });
    } catch (err) {
      console.error("❌ خطا در ارتباط با زرین‌پال (pay-request):", err);
      return NextResponse.json(
        { message: "ارتباط با درگاه پرداخت برقرار نشد. لطفاً دوباره تلاش کنید" },
        { status: 502 },
      );
    }

    // ⚠️ توجه: پاسخ zarinpal-pay مستقیم (flat) هست، نه زیر .data
    if (createTransaction?.code !== 100) {
      console.error("❌ زرین‌پال کد خطا برگردوند:", createTransaction);
      return NextResponse.json(
        {
          message:
            createTransaction?.message ||
            `خطا در ایجاد تراکنش پرداخت (کد ${createTransaction?.code})`,
        },
        { status: 502 },
      );
    }

   await prisma.payments.create({
  data: {
    order_id: order.id,
    amount: order.total_price,
    payment_method: "zarinpal",
    status: 0,
    transaction_code: `PENDING-${order.id}-${Date.now()}`,
    authority: createTransaction.authority,
    sending_method: sendingMethod, // ⬅️ اضافه شد
  },
});

    return NextResponse.json({
      link: createTransaction.link, // پکیج خودش لینک کامل رو می‌ده
    });
  },
  [1, 2],
);