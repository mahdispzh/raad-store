// src/app/profile/orders/_components/ui/order-header-item.tsx
import { Text } from "@/src/shared/ui";
import { OrderHeaderItemProps } from "../_types/order.types";

export function OrderHeaderItem({ icon: Icon, text }: OrderHeaderItemProps) {
  return (
    <div className="flex items-center gap-1">
      <Icon size="sm" color="text-danger" />
      <Text text={text} size="sm" weight="regular" />
    </div>
  );
}