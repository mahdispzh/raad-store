import { CalendarIcon } from "@/src/shared/constants/icons/calendar-icon";
import { DiscountBoxIcon } from "@/src/shared/constants/icons/discount-box-icon";
import { OrderIcon } from "@/src/shared/constants/icons/order-icon";
import { TicketIcon } from "@/src/shared/constants/icons/ticket-icon";
import { OrderSteps } from "@/src/shared/ui";
import { OrderCardCurrentProps } from "../_types/order.types";
import { getProductFeaturesText } from "../_utils/order-mappers";
import { OrderHeaderItem } from "./order-header-item";
import { OrderShipmentItem } from "./order-shipment-item";

export function OrderCardCurrent({
  date = "۵ اردیبهشت ۱۴۰۵",
  totalPrice = "۶,۸۹۰,۰۰۰",
  discount = "۱,۲۰۰,۰۰۰",
  orderCode = "۶۵۴۳۷۸۲",
  currentStep = 0,
  orderItems = [],
}: OrderCardCurrentProps) {
  const orderHeaderItems = [
    { icon: CalendarIcon, text: date },
    { icon: TicketIcon, text: `مبلغ: ${totalPrice}` },
    { icon: DiscountBoxIcon, text: `تخفیف: ${discount}` },
    { icon: OrderIcon, text: `کد سفارش: ${orderCode}` },
  ];

  return (
    <div className="menu-item-border flex flex-col overflow-hidden">
      <div className="menu-item-padding bg-light-gray gap-layout flex flex-col items-center justify-between border-b-2 border-gray sm:flex-row">
        <div className="gap-layout grid grid-cols-2 lg:grid-cols-4">
          {orderHeaderItems.map((item, i) => (
            <OrderHeaderItem key={i} icon={item.icon} text={item.text} />
          ))}
        </div>
        <div className="mb-2">
          <OrderSteps currentStep={currentStep} />
        </div>
      </div>

      <div className="flex flex-col">
        {orderItems.map((item, i) => (
          <OrderShipmentItem
            key={item.id}
            isLast={i === orderItems.length - 1}
            shipmentNumber={i + 1}
            totalShipments={orderItems.length}
            productImage={item.products?.images?.[0] ?? "/images/image31.svg"}
            productName={item.products?.name ?? "کالا"}
            productFeatures={getProductFeaturesText(item)}
            productSlug={item.products?.slug || "default-product"}
          />
        ))}
      </div>
    </div>
  );
}
