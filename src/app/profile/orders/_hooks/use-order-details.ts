"use client";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../_services/orders.api";
import { OrderAPI } from "../_types/order.types";

export function useOrderDetails(orderId: string) {
  return useQuery<OrderAPI>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(Number(orderId)),
    enabled: !!orderId,
    staleTime: 60 * 1000,
  });
}