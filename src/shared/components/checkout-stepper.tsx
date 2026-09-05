"use client";

import { DeliveryIcon } from "@/src/shared/constants/icons/delivery-icon";
import { LocationIcon } from "@/src/shared/constants/icons/location-icon";
import { OrderIcon } from "@/src/shared/constants/icons/order-icon";
import { PayIcon } from "@/src/shared/constants/icons/pay-icon";
import { CheckIcon } from "../constants/icons/check-icon";

type StepperProps = {
  currentStep: 1 | 2 | 3 | 4 | 5;
};

const steps = [
  { id: 1, label: "سبد خرید", icon: OrderIcon },
  { id: 2, label: "آدرس", icon: DeliveryIcon },
  { id: 3, label: "ارسال", icon: LocationIcon },
  { id: 4, label: "پرداخت", icon: PayIcon },
  { id: 5, label: "وضعیت", icon: CheckIcon },
];

export function CheckoutStepper({ currentStep }: StepperProps) {
  return (
    <div className="py-4 md:py-6">
      <div className="mx-auto flex w-fit items-start">
        {steps.map((step, index) => {
          const isActive = step.id <= currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 p-2 transition-all duration-300 md:h-12 md:w-12 lg:h-[3vw] lg:w-[3vw] ${
                    isActive ? "border-secondary" : "border-accent opacity-40"
                  } `}
                >
                  <Icon
                    size="lg"
                    color={isActive ? "text-secondary" : "text-accent"}
                  />
                </div>

                <p
                  className={`text-medium mt-2 text-center text-[11px] whitespace-nowrap md:text-sm lg:text-base ${
                    isActive ? "text-secondary" : "text-accent"
                  } `}
                >
                  {step.label}
                </p>
              </div>

              {/* Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`mb-7 h-[2px] w-[10vw] transition-all duration-300 lg:w-[8vw] ${
                    step.id < currentStep
                      ? "bg-secondary"
                      : "bg-accent opacity-40"
                  } `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
