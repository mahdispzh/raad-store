// _utils/factors.utils.ts

import {
  Factor,
  OrderDetailData,
  ProductDetail,
  RawOrder,
  RawOrderItem,
} from "../_types/factors.types";

// ===== فرمت تاریخ به شمسی =====
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fa-IR");
};

// ===== فرمت مبلغ با تومان =====
export const formatAmount = (amount: number): string => {
  return `${amount.toLocaleString("fa-IR")} تومان`;
};

// ===== کوتاه‌کردن متن =====
export const truncateText = (text: string, maxLength: number = 28): string => {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
};

// ===== تبدیل سفارش خام به فاکتور =====
export function mapOrderToFactor(order: RawOrder): Factor {
  const items = order.order_items ?? [];
  const firstItem = items[0];

  // عکس اولین آیتم سفارش، از products.images (اولین عکس آرایه)
  const image = firstItem?.products?.images?.[0] || "/images/image32.svg";

  // اسم آیتم‌های خریداری‌شده
  const itemsNames = items
    .map((item: RawOrderItem) => item.products?.name || "")
    .filter(Boolean)
    .join("، ");

  // مبلغ کل، مستقیم از orders.total_price
  const amount = order.total_price ?? 0;

  // ⚠️ در دیتابیس شما هیچ فیلدی برای «مبلغ بعد از تخفیف» ذخیره نمی‌شود
  // (unit_price همون قیمتیه که موقع سفارش ثبت شده، بدون تفکیک تخفیف).
  // برای همین فعلاً این دو مقدار برابرند؛ اگر تخفیف واقعی سفارش لازم است،
  // باید یک فیلد مثل original_price روی order_items ذخیره و برگردانده شود.
  const discountedAmount = amount;

  return {
    id: order.id,
    factor_number: order.id,
    image,
    title: `فاکتور شماره ${order.id}`,
    description: truncateText(itemsNames || "-"),
    amount,
    discounted_amount: discountedAmount,
    status: order.status,
    created_at: order.created_at,
  };
}

// ===== تبدیل سفارش خام به آیتم محصول جزئیات =====
function mapOrderItemToProductDetail(item: RawOrderItem): ProductDetail {
  const product = item.products;
  const variant = item.product_variants;

  // قیمت فعلی محصول از روی variant (اگر قیمتی برایش ثبت شده)، وگرنه همون
  // قیمتی که موقع خرید ثبت شده (unit_price)
  const currentPriceValue = variant?.price ?? item.unit_price;

  return {
    id: item.id,
    image: product?.images?.[0] || "/images/image32.svg",
    name: product?.name || "-",
    price: formatAmount(item.unit_price),
    currentPrice: formatAmount(currentPriceValue),
    quantity: item.quantity.toLocaleString("fa-IR"),
    brand: product?.brands?.name || "-",
    // ⚠️ در اسکیمای پریزما هیچ فیلدی برای «جنس محصول» وجود ندارد
    // (نه روی products و نه روی product_variants)، پس همیشه "-" می‌ماند
    // مگر اینکه فیلدی مثل material به مدل products اضافه شود.
    features:
      product?.features
        ?.map((feature) =>
          feature.value ? `${feature.name}: ${feature.value}` : feature.name,
        )
        .filter(Boolean)
        .join("، ") || "-",
    code: variant?.sku || `PRD-${item.product_id}`,
    description: product?.description || "-",
    // ✅ با exactOptionalPropertyTypes: true نباید undefined را صریحاً ست کنیم؛
    // فقط وقتی مقدار واقعی داریم کلید را اضافه می‌کنیم
    ...(variant?.sizes?.name ? { size: variant.sizes.name } : {}),
    ...(variant?.colors?.hex_code ? { color: variant.colors.hex_code } : {}),
  };
}

// ===== تبدیل سفارش خام به جزئیات کامل سفارش (برای صفحه جزئیات) =====
export function mapOrderToDetail(order: RawOrder): OrderDetailData {
  const address = order.user_addresses;
  const items = order.order_items ?? [];

  const addressText = address
    ? [address.province, address.city, address.address]
        .filter(Boolean)
        .join("، ")
    : "-";

  return {
    id: order.id,
    status: order.status,
    trackingCode: `${order.id}`,
    orderDate: order.created_at ? formatDate(order.created_at) : "-",
    recipientName: address?.receiver_name || order.users?.name || "-",
    recipientPhone: address?.receiver_phone || order.users?.phone || "-",
    address: addressText,
    postalCode: address?.postal_code || "-",
    totalAmount: formatAmount(order.total_price ?? 0),
    products: items.map(mapOrderItemToProductDetail),
  };
}

// ===== فیلتر فاکتورها بر اساس جستجو =====
export const filterFactors = (factors: Factor[], search: string): Factor[] => {
  if (!search) return factors;
  return factors.filter(
    (f) => f.title.includes(search) || `${f.factor_number}`.includes(search),
  );
};
