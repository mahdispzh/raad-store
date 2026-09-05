// _hooks/usePayments.hook.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getPayments,
  getPaymentsDashboard,
  PaymentsFilters,
} from "../_services/payments.api";

export function usePaymentsList(filters: PaymentsFilters = {}) {
  return useQuery({
    queryKey: ["payments", filters],
    queryFn: () => getPayments(filters),
    placeholderData: (prev) => prev,
  });
}

export function usePaymentsDashboard() {
  return useQuery({
    queryKey: ["payments-dashboard"],
    queryFn: () => getPaymentsDashboard(),
    staleTime: 1000 * 60 * 5, // 5 دقیقه cache
  });
}