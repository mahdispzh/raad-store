"use client";

import { defaultSteps } from "./order-steps.constants";
import type { OrderStepsProps } from "./order-steps.types";
import { useOrderSteps } from "./useOrderSteps";

export function OrderSteps({
  currentStep,
  steps,
  className = "",
}: OrderStepsProps) {
  const stepList = steps ?? defaultSteps;

  return (
    <div className={`flex items-center justify-center ${className} `}>
      <div className="flex items-start">
        {stepList.map((step, index) => {
          const {
            isCompleted,
            isCurrent,

            circleBorderClass,
            dotClass,
            lineClass,
            textWeightClass,
          } = useOrderSteps(currentStep, index);

          return (
            <div key={step} className="flex items-center">
              {/* Step */}
              <div className="relative flex min-w-fit flex-col items-center">
                {/* Radio */}
                <div
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${circleBorderClass} `}
                >
                  {(isCompleted || isCurrent) && (
                    <div
                      className={`h-[9px] w-[9px] rounded-full ${dotClass} `}
                    />
                  )}
                </div>

                {/* Title */}
                <span
                  className={`absolute pt-6 text-xs whitespace-nowrap text-primary ${textWeightClass} `}
                >
                  {step}
                </span>
              </div>

              {/* Line */}
              {index !== stepList.length - 1 && (
                <div
                  className={`h-[1px] w-[64px] transition-all duration-200 ${lineClass} `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
