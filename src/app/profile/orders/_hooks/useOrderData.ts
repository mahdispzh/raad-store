// src/app/profile/orders/_hooks/useOrderData.ts
import { useEffect } from "react";
import orderData from "../_constants/text.json";
import { OrderData, UseOrderDataReturn } from "../_types/order.types";

export const useOrderData = (): UseOrderDataReturn => {
  const data = orderData as OrderData;
  const order = data.order;

  const sellerInfo = [
    { label: order.invoice.fields.seller, value: order.invoice.values.seller },
    { label: order.invoice.fields.nationalId, value: order.invoice.values.nationalId },
    { label: order.invoice.fields.registrationNumber, value: order.invoice.values.registrationNumber },
    { label: order.invoice.fields.economicCode, value: order.invoice.values.economicCode },
  ];

  const sellerAddress = [
    { label: order.invoice.fields.identifier, value: order.invoice.values.identifier },
    { label: order.invoice.fields.postalCode, value: order.invoice.values.postalCode },
  ];

  const invoiceInfo = [
    { label: order.invoice.fields.invoiceNumber, value: order.invoice.values.invoiceNumber },
    { label: order.invoice.fields.date, value: order.invoice.values.date },
    { label: order.invoice.fields.tracking, value: order.invoice.values.tracking },
  ];

  const buyerInfo = [
    { label: order.invoice.fields.buyer, value: order.invoice.values.buyer },
    { label: order.invoice.fields.nationalCode, value: order.invoice.values.nationalCode || order.emptyValue },
    { label: order.invoice.fields.phoneNumber, value: order.invoice.values.phoneNumber || order.emptyValue },
  ];

  const buyerAddress = [
    { label: order.invoice.fields.identifier, value: order.invoice.values.identifier },
    { label: order.invoice.fields.postalCode, value: order.invoice.values.postalCode },
  ];

  const taxInfo = [
    { label: order.invoice.fields.taxNumber, value: order.invoice.values.taxNumber },
    { label: order.invoice.fields.taxMemorySerial, value: order.invoice.values.taxMemorySerial },
    { label: order.invoice.fields.posSerial, value: order.invoice.values.posSerial },
  ];

  const totalSum = order.items.reduce((sum, item) => {
    const priceAfterDiscount = (item.amount - item.discount) * item.quantity;
    return sum + priceAfterDiscount;
  }, 0);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("fa-IR");
  };

  // ✅ اصلاح: useEffect به درستی نوشته شده
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        .no-print { display: none !important; }
        body { padding: 0; margin: 0; }
        .print-padding { padding: 20px; }
        table { page-break-inside: avoid; }
      }
    `;
    document.head.appendChild(style);

    // ✅ تابع cleanup به درستی برمی‌گرداند
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return {
    order,
    sellerInfo,
    sellerAddress,
    invoiceInfo,
    buyerInfo,
    buyerAddress,
    taxInfo,
    totalSum,
    formatNumber,
  };
};