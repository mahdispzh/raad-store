
"use client";
import { Caption, DefaultButton, Subtitle, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useOrderData } from "../../../_hooks/useOrderData";

interface Props {}

export default function OrderDetails({}: Props) {
  const {
    order,
    sellerInfo,
    sellerAddress,
    invoiceInfo,
    buyerInfo,
    buyerAddress,
    taxInfo,
    totalSum,
    formatNumber,
  } = useOrderData();

  return (
    <div className="gap-layout flex flex-col justify-center p-5">
      <div className="flex flex-row justify-between">
        <div>
          <Image src="/images/logo.svg" width={141} height={51} alt="logo" />
        </div>
        <div>
          <Subtitle
            text={order.invoice.title}
            size="2xl"
            color="danger"
            weight="bold"
          />
        </div>
        <div>
          <div className="no-print">
            <DefaultButton
              type="secondary"
              style="fill"
              label={order.invoice.button}
              action={() => window.print()}
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
              <Subtitle
                text={order.invoice.fields.seller}
                size="2xl"
                color="primary"
                weight="medium"
              />
            </td>
            <td className="border border-primary/20 p-5">
              <div className="flex flex-wrap gap-5 gap-y-3">
                {sellerInfo.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Text
                      text={item.label}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                    <Text
                      text={item.value || order.emptyValue}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-5 gap-x-10 gap-y-3 pt-5">
                {sellerAddress.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Text
                      text={item.label}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                    <Text
                      text={item.value || order.emptyValue}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                  </div>
                ))}
              </div>
            </td>
            <td className="border border-primary/20 p-5">
              <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                  {invoiceInfo.map((item, idx) => (
                    <Text
                      key={idx}
                      text={item.label}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                  ))}
                </div>
                <div className="flex flex-col items-end gap-3">
                  {invoiceInfo.map((item, idx) => (
                    <Text
                      key={idx}
                      text={item.value || order.emptyValue}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                  ))}
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td className="border border-primary/20 p-5 align-top">
              <Subtitle
                text={order.invoice.fields.buyer}
                size="2xl"
                color="primary"
                weight="medium"
              />
            </td>
            <td className="border border-primary/20 p-5">
              <div className="flex flex-wrap gap-5 gap-x-10 gap-y-3">
                {buyerInfo.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Text
                      text={item.label}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                    <Text
                      text={item.value || order.emptyValue}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-5 gap-x-10 gap-y-3 pt-5">
                {buyerAddress.map((item, idx) => (
                  <div key={idx} className="flex gap-1">
                    <Text
                      text={item.label}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                    <Text
                      text={item.value || order.emptyValue}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                  </div>
                ))}
              </div>
            </td>
            <td className="border border-primary/20 p-5">
              <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                  {taxInfo.map((item, idx) => (
                    <Text
                      key={idx}
                      text={item.label}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                  ))}
                </div>
                <div className="flex flex-col items-end gap-3">
                  {taxInfo.map((item, idx) => (
                    <Text
                      key={idx}
                      text={item.value || order.emptyValue}
                      size="md"
                      color="primary"
                      weight="regular"
                    />
                  ))}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse border border-primary/20">
        <thead>
          <tr>
            {order.productColumns.map((col) => (
              <th
                key={col.key}
                className="border border-primary/20 p-3 text-center"
              >
                <div className="flex justify-center">
                  <Text
                    text={col.label}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.row}>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text
                    text={item.row.toString()}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text
                    text={item.productId}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text
                    text={item.description}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text
                    text={item.seller}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex justify-center">
                  <Text
                    text={`${item.quantity} ${item.unit}`}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Text
                    text={formatNumber(item.amount)}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                  <Caption text={order.currency} size="xs" color="primary" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Text
                    text={formatNumber(item.discount * item.quantity)}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                  <Caption text={order.currency} size="xs" color="primary" />
                </div>
              </td>
              <td className="border border-primary/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Text
                    text={formatNumber(
                      (item.amount - item.discount) * item.quantity,
                    )}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                  <Caption text={order.currency} size="xs" color="primary" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="w-full border-collapse border border-primary/20">
        <tbody>
          <tr className="border-b border-primary/20" style={{ height: "60px" }}>
            <td
              colSpan={4}
              className="border border-primary/20 py-4"
              style={{ paddingLeft: "20vw", paddingRight: "30vw" }}
            >
              <div className="flex items-center justify-between">
                <Text
                  text={order.summary.label}
                  size="lg"
                  color="black"
                  weight="regular"
                />
                <div className="flex items-center gap-1">
                  <Text
                    text={formatNumber(totalSum)}
                    size="lg"
                    color="black"
                    weight="regular"
                  />
                  <Caption text={order.currency} size="xs" color="primary" />
                </div>
              </div>
            </td>
          </tr>
          <tr style={{ height: "10vw" }}>
            <td className="w-[30%] border border-primary/20 p-4 align-middle">
              <div className="flex justify-between">
                <Text
                  text={order.signatures.deliveryDate}
                  size="lg"
                  color="black"
                  weight="regular"
                />
                <Text
                  text={order.deliveryDate}
                  size="lg"
                  color="black"
                  weight="regular"
                />
              </div>
            </td>
            <td className="w-[20%] border border-primary/20 p-4 text-center align-middle">
              <Text
                text={order.signatures.buyerSignature}
                size="lg"
                color="black"
                weight="regular"
              />
            </td>
            <td className="w-[20%] border border-primary/20 p-4 text-center align-middle">
              <Text
                text={order.signatures.sellerSignature}
                size="lg"
                color="black"
                weight="regular"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

