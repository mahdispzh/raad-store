// src/app/profile/payment/_components/shipping-options.tsx

"use client";

import { OfficerIcon } from "@/src/shared/constants/icons/officer-icon";
import { TruckIcon } from "@/src/shared/constants/icons/truck-icon";
import { Price, Text } from "@/src/shared/ui";
import { Radio } from "@/src/shared/ui/radio/radio.ui";
import shippingMethodsData from "../../_constants/shipping-method.json";
import { ShippingOptionsProps } from "../../_types/shipping.types";

export function ShippingOptions({
  selected,
  onSelect,
}: Omit<ShippingOptionsProps, "regularCost" | "expressCost">) {
  const { shippingMethods } = shippingMethodsData;

  const regularCost = shippingMethods.regular.cost;
  const expressCost = shippingMethods.express.cost;

  return (
    <div className="flex flex-3 flex-col rounded-sm border border-gray">
      <div className="flex flex-1 items-center border-b border-gray p-4 md:p-6">
        <Text 
          size="lg" 
          weight="medium" 
          text={shippingMethodsData.labels.shippingMethod.subtitle} 
        />
      </div>
      <div className="flex w-full flex-6 flex-col">
        <div
          className={`flex w-full flex-1 cursor-pointer flex-row items-center border-b border-gray p-6 ${
            selected === "regular" ? "bg-gray-100" : ""
          }`}
          onClick={() => onSelect("regular")}
        >
          <div className="flex flex-1 flex-row gap-[0.5vw]">
            <div className="flex flex-row items-start gap-[1vw]">
              <Radio checked={selected === "regular"} />
              <TruckIcon />
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <Text text={shippingMethods.regular.title} size="lg" weight="medium" />
              <Text
                text={shippingMethods.regular.description}
                size="sm"
                weight="regular"
                color="gray"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex flex-row items-center gap-10">
              <div className="w-20">
                <Text text="هزینه ارسال" size="sm" weight="medium" />
              </div>
              <Price price={regularCost} />
            </div>
            <div className="flex flex-row items-center gap-10">
              <div className="w-20">
                <Text text="تحویل" size="sm" weight="medium" />
              </div>
              <Text text={shippingMethods.regular.deliveryTime} size="sm" weight="medium" />
            </div>
          </div>
        </div>

        <div
          className={`flex w-full flex-1 cursor-pointer flex-row items-center rounded-b-sm p-6 ${
            selected === "express" ? "bg-gray-100" : ""
          }`}
          onClick={() => onSelect("express")}
        >
          <div className="flex flex-1 flex-row gap-[0.5vw]">
            <div className="flex flex-row items-start gap-[1vw]">
              <Radio checked={selected === "express"} />
              <div className="-mt-2">
                <OfficerIcon />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <Text text={shippingMethods.express.title} size="lg" weight="medium" />
              <Text
                text={shippingMethods.express.description}
                size="sm"
                weight="regular"
                color="gray"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 lg:gap-6">
            <div className="flex flex-row items-center gap-10">
              <div className="w-20">
                <Text text="هزینه ارسال" size="sm" weight="medium" />
              </div>
              <Price price={expressCost} />
            </div>
            <div className="flex flex-row items-center gap-10">
              <div className="w-20">
                <Text text="تحویل" size="sm" weight="medium" />
              </div>
              <Text text={shippingMethods.express.deliveryTime} size="sm" weight="medium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}