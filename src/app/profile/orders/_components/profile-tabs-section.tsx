// src/app/profile/orders/_components/ui/profile-tabs-section.tsx
"use client";

import { EmptyState } from "@/src/shared/components/empty-states/profile-empty-states";
import { CheckBoldIcon } from "@/src/shared/constants/icons/check-bold-icon";
import { useState } from "react";
import {
  OrderTabKey,
  useOrdersByTab,
  useOrderStatusCounts,
} from "../_hooks/use-orders-query";
import { TabItem } from "../_types/order.types";
import {
  mapToCurrentCardProps,
  mapToDeliveredCardProps,
  mapToReturnedCardProps,
} from "../_utils/order-mappers";
import { OrderCardCurrent } from "./order-card-current";
import { OrderCardDelivered } from "./order-card-delivered";
import { OrderCardReturned } from "./order-card-returned";
import { ProfileTab } from "./profile-tab";

export function TabsSection() {
  const [activeTab, setActiveTab] = useState<OrderTabKey>("current");

  const { data: statusCounts } = useOrderStatusCounts();

  const {
    data: currentData,
    isLoading: isCurrentLoading,
    error: currentError,
  } = useOrdersByTab("current");

  const {
    data: deliveredData,
    isLoading: isDeliveredLoading,
    error: deliveredError,
  } = useOrdersByTab("delivered");

  const {
    data: returnedData,
    isLoading: isReturnedLoading,
    error: returnedError,
  } = useOrdersByTab("returned");

  const tabs: TabItem[] = [
    { key: "current", label: "جاری", count: statusCounts?.current ?? 0 },
    {
      key: "delivered",
      label: "تحویل داده شده",
      count: statusCounts?.delivered ?? 0,
    },
    { key: "returned", label: "مرجوع شده", count: statusCounts?.returned ?? 0 },
  ];

  return (
    <div className="gap-layout menu-item-padding flex flex-col">
      <div className="flex items-end gap-8 border-b-2 border-gray pb-2">
        {tabs.map((tab) => (
          <ProfileTab
            key={tab.key}
            label={tab.label}
            count={tab.count}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key as OrderTabKey)}
          />
        ))}
      </div>

      <div>
        {activeTab === "current" && (
          <div className="gap-layout flex flex-col">
            {isCurrentLoading && <p>در حال بارگذاری...</p>}
            {currentError && (
              <p className="text-danger">خطا در دریافت سفارش‌های جاری</p>
            )}
            {!isCurrentLoading &&
              !currentError &&
              currentData?.data.length === 0 && (
                <EmptyState
                  label="هنوز سفارشی ثبت نکرده‌اید."
                  text="پس از ثبت اولین سفارش، اطلاعات آن در این بخش نمایش داده خواهد شد."
                />
              )}
            {currentData?.data.map((order) => (
              <OrderCardCurrent
                key={order.id}
                {...mapToCurrentCardProps(order)}
              />
            ))}
          </div>
        )}

        {activeTab === "delivered" && (
          <div className="gap-layout flex flex-col">
            {isDeliveredLoading && <p>در حال بارگذاری...</p>}
            {deliveredError && (
              <p className="text-danger">خطا در دریافت سفارش‌های تحویل شده</p>
            )}
            {!isDeliveredLoading &&
              !deliveredError &&
              deliveredData?.data.length === 0 && (
                <EmptyState
                  label="هنوز سفارشی ثبت نکرده‌اید."
                  text="پس از ثبت اولین سفارش، اطلاعات آن در این بخش نمایش داده خواهد شد."
                />
              )}
            {deliveredData?.data.map((order) => (
              <OrderCardDelivered
                key={order.id}
                status="تحویل شده"
                statusIcon={CheckBoldIcon}
                {...mapToDeliveredCardProps(order)}
              />
            ))}
          </div>
        )}

        {activeTab === "returned" && (
          <div className="gap-layout flex flex-col">
            {isReturnedLoading && <p>در حال بارگذاری...</p>}
            {returnedError && (
              <p className="text-danger">خطا در دریافت سفارش‌های مرجوع شده</p>
            )}
            {!isReturnedLoading &&
              !returnedError &&
              returnedData?.data.length === 0 && (
                <EmptyState
                  label="هنوز سفارشی ثبت نکرده‌اید."
                  text="پس از ثبت اولین سفارش، اطلاعات آن در این بخش نمایش داده خواهد شد."
                />
              )}
            {returnedData?.data.map((order) => (
              <OrderCardReturned
                key={order.id}
                {...mapToReturnedCardProps(order)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}