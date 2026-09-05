// src/app/profile/orders/_utils/order-mappers.ts

import {
  OrderAPI,
  OrderAPIItem,
  OrderCardCurrentProps,
  OrderCardDeliveredProps,
  OrderCardReturnedProps,
  OrderDetailsHeaderProps,
  OrderDetailsCardProps,
} from "../_types/order.types";

const formatPrice = (num: number): string => num.toLocaleString("fa-IR");

const toJalaliDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("fa-IR");

// ⚠️ روی orders/order_items فیلد تخفیف ذخیره نمی‌شه (طبق اسکیمای پریزما)
// پس فعلاً همیشه صفره؛ اگه تخفیف واقعی لازمه باید فیلدش به دیتابیس اضافه بشه
const getOrderDiscount = (): number => 0;

// وضعیت‌های 1..5 = جاری. OrderSteps از 0 شروع می‌شه، پس یکی کم می‌کنیم
const getCurrentStepFromStatus = (status: number): number => {
  const clamped = Math.min(Math.max(status, 1), 5);
  return clamped - 1;
};

// ===== متن ویژگی محصول (رنگ | سایز) برای هر آیتم سفارش =====
export function getProductFeaturesText(item: OrderAPIItem): string {
  const parts: string[] = [];

  if (item.product_variants?.colors?.name) {
    parts.push(`رنگ ${item.product_variants.colors.name}`);
  }
  if (item.product_variants?.sizes?.name) {
    parts.push(`سایز ${item.product_variants.sizes.name}`);
  }

  return parts.length ? parts.join(" | ") : "-";
}

// ===== تب «جاری» =====
export function mapToCurrentCardProps(order: OrderAPI): OrderCardCurrentProps {
  return {
    date: toJalaliDate(order.created_at),
    totalPrice: formatPrice(order.total_price),
    discount: formatPrice(getOrderDiscount()),
    orderCode: `${order.id}`,
    currentStep: getCurrentStepFromStatus(order.status),
    orderItems: order.order_items ?? [], // ✅ آیتم‌های واقعی، تک‌به‌تک به OrderShipmentItem می‌رن
  };
}

// ===== تب «تحویل‌شده» =====
export function mapToDeliveredCardProps(order: OrderAPI): OrderCardDeliveredProps {
  const items = order.order_items ?? [];

  return {
    date: toJalaliDate(order.created_at),
    orderCode: `${order.id}`,
    totalPrice: formatPrice(order.total_price),
    discount: formatPrice(getOrderDiscount()),
    // ✅ به‌جای ۳ عکس ثابت placeholder، عکس واقعیِ هر آیتمِ همین سفارش
    productImages: items.length
      ? items.map((item) => item.products?.images?.[0] || "/images/image31.svg")
      : ["/images/image31.svg"],
    orderId: `${order.id}`,
  };
}

// ===== تب «مرجوع‌شده» =====
export function mapToReturnedCardProps(order: OrderAPI): OrderCardReturnedProps {
  const items = order.order_items ?? [];
  return {
    date: toJalaliDate(order.created_at),
    orderCode: `${order.id}`,
    totalPrice: formatPrice(order.total_price),
    discount: formatPrice(getOrderDiscount()),
    productImages: items.length
      ? items.map((item) => item.products?.images?.[0] || "/images/image31.svg")
      : ["/images/image31.svg"],
    orderId: `${order.id}`,
  };
}

// ===== هدر صفحه جزئیات سفارش =====
export function mapToOrderDetailsHeaderProps(order: OrderAPI): OrderDetailsHeaderProps {
  const addr = order.user_addresses;

  return {
    orderId: `${order.id}`,
    trackingCode: `${order.id}`, // ⚠️ فیلد جدای tracking در اسکیما نیست، فعلاً از id استفاده شده
    orderDate: toJalaliDate(order.created_at),
    recipient: addr?.receiver_name ?? "-",
    phone: addr?.receiver_phone ?? "-",
    totalPrice: order.total_price,
    address: addr ? `${addr.province}، ${addr.city}، ${addr.address}` : "-",
    deliveryDate: toJalaliDate(order.updated_at), // ⚠️ تاریخ تحویل جدا ذخیره نمیشه
    shippingMethod: "ارسال پست پیشتاز", // ⚠️ اگه فیلد روش ارسال داری جایگزین کن
    currentStep: `${order.status}`,
  };
}

// ===== کارت‌های محصول در صفحه جزئیات سفارش =====
export function mapToOrderDetailsCards(order: OrderAPI): OrderDetailsCardProps[] {
  const items = order.order_items ?? [];
  return items.map((item, i) => ({
    shipmentNumber: i + 1,
    totalShipments: items.length,
    productImage: item.products?.images?.[0] ?? "/images/image34.svg",
    quantity: item.quantity,
    productName: item.products?.name ?? "کالا",
    purchasedPrice: formatPrice(item.unit_price),
    currentPrice: formatPrice(item.unit_price), // ⚠️ قیمت فعلی جدا در دیتا نیست
    productSlug: item.products?.slug || "default-product",
  }));
}