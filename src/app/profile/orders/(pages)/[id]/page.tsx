"use client";

import { use } from "react";
import { OrderDetailsHeader } from "../../_components/order-details-header";
import { OrderDetailsMain } from "../../_components/order-details-main";
import { useOrderDetails } from "../../_hooks/use-order-details";
import { mapToOrderDetailsHeaderProps } from "../../_utils/order-mappers";

interface Props {
  params: Promise<{ id: string }>; // ✅ در Next.js 15، params یک Promise است
}

export default function OrderDetails({ params }: Props) {
  const { id } = use(params); // ✅ unwrap با React.use()

  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error || !order) return <p className="text-danger">سفارش پیدا نشد.</p>;

  return (
    <div className="gap-layout flex flex-col">
      <OrderDetailsHeader {...mapToOrderDetailsHeaderProps(order)} />
      <OrderDetailsMain orderData={order} />
    </div>
  );
}