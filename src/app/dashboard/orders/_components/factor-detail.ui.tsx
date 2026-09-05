// _components/factor-detail.ui.tsx
"use client";

import {
  LeftArrowIcon,
  RightArrowIcon,
  RulerIcon,
  TruckIcon,
  WalletIcon,
} from "@/src/shared/constants/icons";
import { DefaultButton, Subtitle, Text } from "@/src/shared/ui";
import { SimpleButton } from "@/src/shared/ui/simple-button/simple-button.ui";
import { SwiperSlider } from "@/src/shared/ui/swiper-slider/swiper-slider.ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";
import { StatusStepper } from "./status-stepper.ui";
import { StepperModal } from "./stepper-modal.ui";
import { STATUS_DESCRIPTIONS } from "../_constants/factors.constants";
import { useOrderDetail } from "../_hooks/useOrderDetail";

interface FactorsDetailTableProps {
  factorId?: string;
}

export function FactorsDetailTable({ factorId }: FactorsDetailTableProps) {
  const router = useRouter();

  const { order, isLoading, error, updateStatus, isUpdatingStatus } =
    useOrderDetail(factorId);

  const [currentStatus, setCurrentStatus] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  // ✅ وقتی وضعیت واقعی سفارش از دیتابیس رسید، استیت محلی را با آن هماهنگ کن
  useEffect(() => {
    if (order) {
      setCurrentStatus(order.status);
    }
  }, [order]);

  const handleStepClick = (step: number) => {
    // ✅ اجازه انتخاب هر مرحله‌ای (چه جلوتر و چه عقب‌تر از وضعیت فعلی)
    if (step === currentStatus) return; // اگر همون مرحله فعلیه، کاری نکن
    setSelectedStatus(step);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedStatus === null) return;

    try {
      // ✅ ارسال وضعیت جدید به سرور با PUT
      await updateStatus(selectedStatus);
      setCurrentStatus(selectedStatus);
    } catch (e) {
      console.error("❌ خطا در تغییر وضعیت سفارش:", e);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleViewInvoice = () => {
    router.push(`/dashboard/factors/${factorId}/invoice`);
  };

  const handleBack = () => {
    router.push("/dashboard/orders");
  };

  const handleNextStep = () => {
    if (currentStatus >= 6) return;
    setSelectedStatus(currentStatus + 1);
    setIsModalOpen(true);
  };

  const handlePrevStep = () => {
    if (currentStatus <= 1) return;
    setSelectedStatus(currentStatus - 1);
    setIsModalOpen(true);
  };

  const getStatusDescription = () => {
    return STATUS_DESCRIPTIONS[0] || "";
  };

  if (isLoading) {
    return (
      <div className="mt-16 flex h-40 w-full items-center justify-center rounded-sm border-2 border-gray">
        در حال بارگذاری...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mt-16 flex h-40 w-full items-center justify-center rounded-sm border-2 border-gray text-red-500">
        خطا در دریافت جزئیات سفارش
      </div>
    );
  }

  const products = order.products;

  return (
    <div className="mt-16 w-full rounded-sm border-2 border-gray p-3">
      {/* Header Buttons */}
      <div className="flex justify-between px-5">
        <div>
          <SimpleButton
            label="جزئیات سفارش"
            icon={<RightArrowIcon size="md" />}
            iconPosition="left"
            action={handleBack}
          />
        </div>
        <div>
          <SimpleButton
            variant="danger"
            label="مشاهده فاکتور"
            icon={<WalletIcon size="md" color="text-danger" />}
            iconPosition="left"
            action={handleViewInvoice}
          />
        </div>
      </div>

      <div className="mt-2 mb-4 h-0.5 bg-gray" />

      {/* Tracking Info - از دیتابیس (سفارش واقعی) */}
      <div className="flex flex-col gap-3 px-10 py-3">
        <div className="flex flex-row items-center gap-10">
          <Text
            text={`کد پیگیری سفارش: ${order.trackingCode}`}
            size="md"
            weight="regular"
            color="primary"
          />
          <div className="h-2 w-2 rounded-full bg-gray" />
          <Text
            text={`تاریخ ثبت سفارش: ${order.orderDate}`}
            size="md"
            weight="regular"
            color="primary"
          />
        </div>
        <div className="flex flex-row items-center gap-10">
          <Text
            text={`تحویل گیرنده: ${order.recipientName}`}
            size="md"
            weight="regular"
            color="primary"
          />
          <div className="h-2 w-2 rounded-full bg-gray" />
          <Text
            text={`شماره موبایل: ${order.recipientPhone}`}
            size="md"
            weight="regular"
            color="primary"
          />
          <div className="h-2 w-2 rounded-full bg-gray" />
          <div className="flex items-center gap-1">
            <Text text={`مبلغ: ${order.totalAmount}`} size="md" weight="regular" color="primary" />
          </div>
        </div>
        <Text text={`آدرس: ${order.address}`} size="md" weight="regular" color="primary" />
      </div>

      <div className="mt-2 mb-4 h-0.5 bg-gray" />

      {/* Shipping Info Box */}
      <div className="m-10 rounded-xs border-2 border-gray p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-3">
                <Text text="1 مرسوله" size="sm" weight="regular" color="primary" />
                <div className="h-2 w-2 rounded-full bg-gray" />
                <div className="flex items-center gap-1">
                  <TruckIcon size="md" />
                  <Text text="ارسال پست پیشتاز" size="sm" weight="regular" color="primary" />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <div className="w-30">
                <DefaultButton
                  label="مرحله قبل"
                  type="primary"
                  style="outline"
                  iconPosition="left"
                  icon={<RightArrowIcon size="md" />}
                  rounded
                  action={handlePrevStep}
                  disabled={currentStatus <= 1 || isUpdatingStatus}
                />
              </div>
              <div className="w-30">
                <DefaultButton
                  label="مرحله بعد"
                  type="primary"
                  style="fill"
                  iconPosition="right"
                  icon={<LeftArrowIcon size="md" />}
                  rounded
                  action={handleNextStep}
                  disabled={currentStatus >= 6 || isUpdatingStatus}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Text text="وضعیت سفارش" size="md" weight="medium" color="primary" />
            <Text text={getStatusDescription()} size="sm" weight="regular" color="secondary" />
          </div>

          <StatusStepper currentStatus={currentStatus} onStepClick={handleStepClick} />
        </div>

        <div className="my-6 h-0.5 bg-gray" />

        {/* Product Slider - آیتم‌های واقعی سفارش */}
        <div className="relative">
          <SwiperSlider
            sliderId="product-slider"
            slidesPerView={1}
            spaceBetween={16}
            className="w-full"
            compact={false}
            onSlideChange={(swiper) => {
              setCurrentIndex(swiper.activeIndex + 1);
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex flex-row gap-6 p-2 pb-10">
                  <div className="relative h-70 w-2/8 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="rounded-xs object-cover"
                      quality={100}
                      priority={false}
                    />
                  </div>

                  <div className="flex w-6/8 flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <Subtitle text={product.name} size="xl" weight="bold" color="primary" />
                      <div className="flex flex-row items-center gap-4">
                        {product.size && (
                          <div className="flex flex-row items-center gap-1">
                            <RulerIcon size="md" color="text-primary" />
                            <Text text={product.size} size="sm" weight="medium" color="primary" />
                          </div>
                        )}
                        {product.color && (
                          <span
                            className="rounded-full"
                            style={{
                              backgroundColor: product.color,
                              width: "1vw",
                              height: "1vw",
                            }}
                          />
                        )}
                        <div className="flex flex-row items-center gap-1">
                          <Text text="تعداد:" size="sm" weight="medium" color="secondary" />
                          <Text text={product.quantity} size="sm" weight="bold" color="primary" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="flex">
                        <Text text="قیمت خریداری شده: " size="md" weight="medium" color="primary" />
                        <Text text={product.price} size="md" weight="bold" color="primary" />
                      </div>
                      <div className="flex">
                        <Text text="قیمت فعلی: " size="md" weight="medium" color="primary" />
                        <Text text={product.currentPrice} size="md" weight="bold" color="primary" />
                      </div>
                    </div>

                    <div className="h-0.5 bg-gray" />

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-6">
                        <Text text={`برند: ${product.brand}`} size="sm" weight="regular" color="primary" />
<Text
  text={`ویژگی‌ها: ${product.features}`}
  size="sm"
  weight="regular"
  color="primary"
/>                        <Text text={`کد محصول: ${product.code}`} size="sm" weight="regular" color="primary" />
                      </div>
<div className="line-clamp-7">
  <Text
    text={product.description}
    size="sm"
    weight="regular"
    color="primary"
  />
</div>                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperSlider>

          <div className="absolute bottom-8 left-6 z-10">
            <div className="flex items-center justify-center rounded-md bg-secondary px-3 py-1 text-medium text-sm text-white">
                         <span>{products.length}</span>

              <span className="mx-1">/</span>
                            <span>{currentIndex}</span>

            </div>
          </div>
        </div>
      </div>

      <StepperModal
        isOpen={isModalOpen}
        status={selectedStatus}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}