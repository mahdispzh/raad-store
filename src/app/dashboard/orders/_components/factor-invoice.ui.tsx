// _components/factor-invoice.ui.tsx
"use client";

import { Caption, DefaultButton, Subtitle, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface InvoiceData {
  title: string;
  button: string;
  currency: string;
  emptyValue: string;
  deliveryDate: string;
  fields: Record<string, string>;
  values: Record<string, string>;
  productColumns: Array<{ key: string; label: string }>;
  items: Array<{
    row: number;
    productId: string;
    description: string;
    seller: string;
    quantity: number;
    unit: string;
    amount: number;
    discount: number;
    total: number;
  }>;
  summary: { total: number; label: string };
  signatures: { buyerSignature: string; deliveryDate: string; sellerSignature: string };
}

interface FactorInvoiceProps {
  factorId?: string;
  data: InvoiceData;
  totalSum: number;
  formatNumber: (num: number) => string;
}

export function FactorInvoice({ factorId, data, totalSum, formatNumber }: FactorInvoiceProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(`/dashboard/factors/${factorId}`);
  };

  // ✅ استفاده از fallback برای جلوگیری از undefined
  const safeString = (value: string | undefined): string => value || data.emptyValue || "---";

  const sellerInfo = [
    { label: data.fields.invoiceNumber, value: data.values.invoiceNumber },
    { label: data.fields.economicCode, value: data.values.economicCode },
    { label: data.fields.registrationNumber, value: data.values.registrationNumber },
    { label: data.fields.nationalId, value: data.values.nationalId },
    { label: data.fields.phoneNumber, value: data.values.phoneNumber },
  ];

  const sellerAddress = [
    { label: data.fields.identifier, value: data.values.identifier },
    { label: data.fields.postalCode, value: data.values.postalCode },
  ];

  const invoiceInfo = [
    { label: data.fields.date, value: data.values.date },
    { label: data.fields.tracking, value: data.values.tracking },
  ];

  const buyerInfo = [
    { label: data.fields.nationalCode, value: data.values.nationalCode },
    { label: data.fields.phoneNumber, value: data.values.phoneNumber },
  ];

  const buyerAddress = [
    { label: data.fields.identifier, value: data.values.identifier },
    { label: data.fields.postalCode, value: data.values.postalCode },
  ];

  const taxInfo = [
    { label: data.fields.taxNumber, value: data.values.taxNumber },
    { label: data.fields.taxMemorySerial, value: data.values.taxMemorySerial },
    { label: data.fields.posSerial, value: data.values.posSerial },
  ];

  return (
    <div className="gap-layout flex flex-col justify-center p-5">
      {/* header */}
      <div className="flex flex-row justify-between">
        <div>
          <Image src="/images/logo.svg" width={141} height={51} alt="logo" />
        </div>
        <div>
          <Subtitle text={data.title} size="2xl" color="danger" weight="bold" />
        </div>
        <div className="flex gap-2">
          <div className="no-print">
            <DefaultButton
              type="secondary"
              style="fill"
              label={data.button}
              action={() => window.print()}
            />
          </div>
          <div className="no-print">
            <DefaultButton
              type="secondary"
              style="outline"
              label="بازگشت"
              action={handleBack}
            />
          </div>
        </div>
      </div>

      <table className="w-full border-collapse border border-primary/20">
        <colgroup>
          <col className="w-[18%]" />
          <col className="w-[52%]" />
          <col className="w-[30%]" />
        </colgroup>
        <tbody>
          <tr>
            <td className="border border-primary/20 p-5 align-top">
              <Subtitle text={data.fields.seller || ""} size="2xl" color="primary" weight="medium" />
            </td>
            <td className="border border-primary/20 p-5">
              <div className="flex flex-wrap gap-5 gap-y-3">
                {sellerInfo.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Text text={item.label || ""} size="md" color="primary" weight="regular" />
                    <Text text={safeString(item.value)} size="md" color="primary" weight="regular" />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-5 gap-x-10 gap-y-3 pt-5">
                {sellerAddress.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Text text={item.label || ""} size="md" color="primary" weight="regular" />
                    <Text text={safeString(item.value)} size="md" color="primary" weight="regular" />
                  </div>
                ))}
              </div>
            </td>
            <td className="border border-primary/20 p-5">
              <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                  {invoiceInfo.map((item, idx) => (
                    <Text key={idx} text={item.label || ""} size="md" color="primary" weight="regular" />
                  ))}
                </div>
                <div className="flex flex-col items-end gap-3">
                  {invoiceInfo.map((item, idx) => (
                    <Text key={idx} text={safeString(item.value)} size="md" color="primary" weight="regular" />
                  ))}
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td className="border border-primary/20 p-5 align-top">
              <Subtitle text={data.fields.buyer || ""} size="2xl" color="primary" weight="medium" />
            </td>
            <td className="border border-primary/20 p-5">
              <div className="flex flex-wrap gap-5 gap-x-10 gap-y-3">
                {buyerInfo.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Text text={item.label || ""} size="md" color="primary" weight="regular" />
                    <Text text={safeString(item.value)} size="md" color="primary" weight="regular" />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-5 gap-x-10 gap-y-3 pt-5">
                {buyerAddress.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Text text={item.label || ""} size="md" color="primary" weight="regular" />
                    <Text text={safeString(item.value)} size="md" color="primary" weight="regular" />
                  </div>
                ))}
              </div>
            </td>
            <td className="border border-primary/20 p-5">
              <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                  {taxInfo.map((item, idx) => (
                    <Text key={idx} text={item.label || ""} size="md" color="primary" weight="regular" />
                  ))}
                </div>
                <div className="flex flex-col items-end gap-3">
                  {taxInfo.map((item, idx) => (
                    <Text key={idx} text={safeString(item.value)} size="md" color="primary" weight="regular" />
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* products table */}
      <table className="w-full border-collapse border border-primary/20">
        <thead>
          <tr>
            {data.productColumns.map((col) => (
              <th key={col.key} className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text text={col.label || ""} size="lg" color="black" weight="regular" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.row}>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text text={item.row.toString()} size="lg" color="black" weight="regular" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text text={item.productId || ""} size="lg" color="black" weight="regular" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text text={item.description || ""} size="lg" color="black" weight="regular" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text text={item.seller || ""} size="lg" color="black" weight="regular" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text text={`${item.quantity} ${item.unit || ""}`} size="lg" color="black" weight="regular" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Text text={formatNumber(item.amount)} size="lg" color="black" weight="regular" />
                  <Caption text={data.currency || ""} size="xs" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Text text={formatNumber(item.discount * item.quantity)} size="lg" color="black" weight="regular" />
                  <Caption text={data.currency || ""} size="xs" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Text
                    text={formatNumber((item.amount - item.discount) * item.quantity)}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                  <Caption text={data.currency || ""} size="xs" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* total and signatures */}
      <table className="w-full border-collapse border border-primary/20">
        <tbody>
          <tr className="border-b border-primary/20" style={{ height: "60px" }}>
            <td colSpan={4} className="border border-primary/20 py-4" style={{ paddingLeft: "20vw", paddingRight: "30vw" }}>
              <div className="flex items-center justify-between">
                <Text text={data.summary.label || ""} size="lg" color="black" weight="regular" />
                <div className="flex items-center gap-1">
                  <Text text={formatNumber(totalSum)} size="lg" color="black" weight="regular" />
                  <Caption text={data.currency || ""} size="xs" />
                </div>
              </div>
            </td>
          </tr>
          <tr style={{ height: "10vw" }}>
            <td className="w-[30%] border border-primary/20 p-4 align-middle">
              <div className="flex justify-between">
                <Text text={data.signatures.deliveryDate || ""} size="lg" color="black" weight="regular" />
                <Text text={data.deliveryDate || ""} size="lg" color="black" weight="regular" />
              </div>
            </td>
            <td className="w-[20%] border border-primary/20 p-4 text-center align-middle">
              <Text text={data.signatures.buyerSignature || ""} size="lg" color="black" weight="regular" />
            </td>
            <td className="w-[20%] border border-primary/20 p-4 text-center align-middle">
              <Text text={data.signatures.sellerSignature || ""} size="lg" color="black" weight="regular" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}