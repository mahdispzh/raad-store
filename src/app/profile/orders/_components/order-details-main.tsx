import { OrderDetailsMainProps } from "../_types/order.types";
import { OrderDetailsCard } from "./order-details-card";
import { mapToOrderDetailsCards } from "../_utils/order-mappers";

export function OrderDetailsMain({ orderData }: OrderDetailsMainProps) {
  const cards = orderData ? mapToOrderDetailsCards(orderData) : [];

  return (
    <div className="gap-layout menu-item-padding menu-item-border flex flex-col">
      {cards.length === 0 && <p>موردی برای نمایش نیست.</p>}
      {cards.map((card, i) => (
        <OrderDetailsCard key={i} {...card} />
      ))}
    </div>
  );
}