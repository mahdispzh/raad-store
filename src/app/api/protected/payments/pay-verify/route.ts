// app/api/protected/payments/pay-verify/route.ts
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { notifyOrderStatusChanged } from "@/src/shared/notifications/notification.service";
import { NextResponse } from "next/server";
import ZarinpalPayment from "zarinpal-pay";

export const POST = withAuth(
  async (req, user) => {
    const body = await req.json();
    const { authority, status } = body as { authority: string; status: "OK" | "NOK" };

    const merchantId = process.env.MERCHANT_ID;
    if (!merchantId) {
      return NextResponse.json(
        { message: "MERCHANT_ID is not defined" },
        { status: 500 },
      );
    }

    const payment = await prisma.payments.findFirst({
      where: { authority },
      include: { orders: true },
    });

    if (!payment) {
      return NextResponse.json({ message: "تراکنش یافت نشد" }, { status: 404 });
    }

    if (payment.orders.user_id !== user.userId) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    // ✅ جلوگیری از verify و کسر موجودی تکراری برای یک تراکنش
if (payment.status === 1) {
  return NextResponse.json({
    code: 100,
    ref_id: payment.ref_id ? Number(payment.ref_id) : undefined,
    card_pan: payment.card_pan,
      sending_method: payment.sending_method, // ⬅️ اضافه شد

  });
}

    if (status !== "OK") {
      await prisma.payments.update({
        where: { id: payment.id },
        data: { status: 2 },
      });
      await prisma.orders.update({
        where: { id: payment.order_id },
        data: { payment_status: 2 },
      });

      return NextResponse.json(
        { code: -1, message: "پرداخت لغو یا رد شد" },
        { status: 200 },
      );
    }

    const zarinpal = new ZarinpalPayment(merchantId, { isSandbox: true });

    let verifyResult;
    try {
      verifyResult = await zarinpal.verify({
        authority,
        amount: payment.amount,
      });
    } catch (err) {
      console.error("❌ خطا در ارتباط با زرین‌پال:", err);

      await prisma.payments.update({
        where: { id: payment.id },
        data: { status: 4 },
      });
      await prisma.orders.update({
        where: { id: payment.order_id },
        data: { payment_status: 4 },
      });

      return NextResponse.json(
        { code: -2, message: "ارتباط با بانک برقرار نشد. لطفاً دوباره تلاش کنید" },
        { status: 502 },
      );
    }

    if (verifyResult?.code === 100 || verifyResult?.code === 101) {
      try {
        const updatedOrder = await prisma.$transaction(async (tx) => {
          // ۱. آپدیت پرداخت
          await tx.payments.update({
            where: { id: payment.id },
            data: {
              status: 1,
              ref_id: String(verifyResult.ref_id),
              card_pan: verifyResult.card_pan,
              card_hash: verifyResult.card_hash,
              paid_at: new Date(),
            },
          });

          // ۲. آپدیت سفارش
          const order = await tx.orders.update({
            where: { id: payment.order_id },
            data: { status: 1, payment_status: 1 },
          });

          // ۳. کسر موجودی برای هر آیتم سفارش
          const orderItems = await tx.order_items.findMany({
            where: { order_id: payment.order_id },
          });

          for (const item of orderItems) {
            const variant = await tx.product_variants.findUnique({
              where: { id: item.variant_id },
            });

            if (!variant || variant.stock < item.quantity) {
              throw new Error(
                `موجودی کافی برای variant ${item.variant_id} وجود ندارد`,
              );
            }

            await tx.product_variants.update({
              where: { id: item.variant_id },
              data: { stock: { decrement: item.quantity } },
            });
          }

          return order;
        });

        await notifyOrderStatusChanged(updatedOrder);

        return NextResponse.json({
          code: verifyResult.code,
          ref_id: verifyResult.ref_id,
          card_pan: verifyResult.card_pan,
        });
      } catch (err) {
        console.error("❌ خطا در کسر موجودی/آپدیت سفارش:", err);
        return NextResponse.json(
          { code: -3, message: "پرداخت انجام شد اما در ثبت سفارش خطایی رخ داد. با پشتیبانی تماس بگیرید" },
          { status: 500 },
        );
      }
    }

    // بانک پاسخ داد ولی verify رد شد
    await prisma.payments.update({
      where: { id: payment.id },
      data: { status: 2 },
    });
    await prisma.orders.update({
      where: { id: payment.order_id },
      data: { payment_status: 2 },
    });

    return NextResponse.json(
      { code: verifyResult?.code, message: "پرداخت تأیید نشد" },
      { status: 200 },
    );
  },
  [1, 2],
);