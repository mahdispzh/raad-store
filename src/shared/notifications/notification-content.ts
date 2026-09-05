import type { NotificationType } from "./notification.types";

type NotificationContent = {
  category: "order" | "favorite" | "comment" | "delivery";
  text: string;
  extraData: string;
};

type Data = Record<string, string | number | boolean | null>;

const orderStatusLabels: Record<number, string> = {
  0: "در انتظار پرداخت",
  1: "ثبت شده",
  2: "در حال آماده‌سازی",
  3: "ارسال شده",
  4: "تحویل شده",
  5: "لغو شده",
};

export function getNotificationContent(
  type: NotificationType | string,
  data: Data | null,
): NotificationContent {
  const orderId = data?.orderId;
  const productName = data?.productName;

  switch (type) {
    case "ORDER_CREATED":
      return { category: "order", text: "سفارش جدید ثبت شد", extraData: `سفارش شماره ${orderId} با موفقیت ثبت شد.` };
    case "ORDER_STATUS_CHANGED":
      return { category: "delivery", text: "وضعیت سفارش تغییر کرد", extraData: `وضعیت سفارش شماره ${orderId} به «${orderStatusLabels[Number(data?.status)] ?? "نامشخص"}» تغییر یافت.` };
    case "PRODUCT_LOW_STOCK":
      return { category: "favorite", text: "موجودی محصول رو به اتمام است", extraData: `موجودی ${productName} به ${data?.stock} عدد رسیده است.` };
    case "PRODUCT_OUT_OF_STOCK":
      return { category: "favorite", text: "محصول ناموجود شد", extraData: `${productName} دیگر موجود نیست.` };
    case "PRODUCT_BACK_IN_STOCK":
      return { category: "favorite", text: "محصول مورد علاقه‌تان موجود شد", extraData: `${productName} دوباره موجود شده است.` };
    default:
      return { category: "comment", text: "پیام جدید", extraData: "یک اعلان جدید برای شما ثبت شد." };
  }
}
