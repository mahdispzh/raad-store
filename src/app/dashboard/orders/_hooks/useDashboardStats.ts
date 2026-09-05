// _hooks/useDashboardStats.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getOrdersSummary,
  getPaymentsSummary,
  getProductsSummary,
} from "../_services/dashboard-stats.api";

const STALE_TIME_MS = 1000 * 60 * 5; // ۵ دقیقه

export function useOrdersSummary() {
  return useQuery({
    queryKey: ["orders-summary"],
    queryFn: getOrdersSummary,
    staleTime: STALE_TIME_MS,
  });
}

export function usePaymentsSummary() {
  return useQuery({
    queryKey: ["payments-summary"],
    queryFn: getPaymentsSummary,
    staleTime: STALE_TIME_MS,
  });
}

export function useProductsSummary() {
  return useQuery({
    queryKey: ["products-summary"],
    queryFn: getProductsSummary,
    staleTime: STALE_TIME_MS,
  });
}