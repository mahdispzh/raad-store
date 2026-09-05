"use client";

import { CurrentIcon } from "@/src/shared/constants/icons/current-icon";
import { DeliveredIcon } from "@/src/shared/constants/icons/delivered-icon";
import { ReturnedIcon } from "@/src/shared/constants/icons/returned-icon";
import { Caption, IconLabelButton, Text, TextRedLine } from "@/src/shared/ui";
import { useRouter } from "next/navigation";
import { useHomeOrders } from "../_hooks/useHomeOrders";

interface Props {}

export function OrderSummary({}: Props) {
  const router = useRouter();
  const { counts, loading } = useHomeOrders();

  const orderSummary = [
    {
      icon: CurrentIcon,
      label: "جاری",
      value: loading ? "..." : `${counts.current} سفارش`,
      status: "current",
    },
    {
      icon: DeliveredIcon,
      label: "تحویل شده",
      value: loading ? "..." : `${counts.delivered} سفارش`,
      status: "delivered",
    },
    {
      icon: ReturnedIcon,
      label: "مرجوع شده",
      value: loading ? "..." : `${counts.returned} سفارش`,
      status: "returned",
    },
  ];

  const handleViewAll = () => {
    router.push("/profile/orders");
  };

  return (
    <>
      <div
        className={
          "menu-item-padding menu-item-border gap-layout flex flex-col py-2"
        }
      >
        <div className={"flex items-start justify-between"}>
          <TextRedLine
            isUnderline
            size={"md"}
            text={"سفارش های من"}
            weight={"bold"}
          />

          <IconLabelButton
            iconPosition={"right"}
            iconType={"dropleft"}
            label={"مشاهده همه"}
            showBorder={false}
            textSize={"md"}
            onClick={handleViewAll}
          />
        </div>
        <div className={"flex w-full"}>
          {orderSummary.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`flex flex-1 items-center justify-center gap-2 ${
                  index !== orderSummary.length - 1
                    ? "border-l-2 border-gray"
                    : ""
                }`}
              >
                <Icon size={"xl"} />

                <div className={"flex flex-col gap-1"}>
                  <Text text={item.value} />
                  <Caption text={item.label} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
