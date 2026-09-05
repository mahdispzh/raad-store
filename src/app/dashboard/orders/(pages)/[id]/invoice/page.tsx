// (pages)/[id]/invoice/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useOrderData } from "../../../_hooks/useOrderData";
import { FactorInvoice } from "../../../_components/factor-invoice.ui";

export default function InvoicePage() {
  const params = useParams();
  const factorId = params.id as string;
  const { order, totalSum, formatNumber } = useOrderData();

  return (
    // <FactorInvoice
    //   factorId={factorId}
    //   data={order.invoice}
    //   totalSum={totalSum}
    //   formatNumber={formatNumber}
    // />
    <>
    </>
  );
}