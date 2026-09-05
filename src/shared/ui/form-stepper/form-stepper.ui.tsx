"use client";

import { cn } from "@/src/shared/utils/cn";
import { FormStepperProps } from "./form-stepper.types";

export function FormStepper({
  steps,
  currentStep,
  className,
}: FormStepperProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* دایره و برچسب */}
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "h-4 w-4 rounded-full border transition-colors",
                  isCompleted || isCurrent
                    ? "border-secondary bg-secondary ring-1 ring-secondary ring-offset-2"
                    : "border-gray bg-white",
                )}
              />
              <span
                className={cn(
                  "absolute top-6 left-1/2 w-20 -translate-x-1/2 text-center text-xs whitespace-nowrap transition-colors",
                  isCompleted || isCurrent ? "text-secondary" : "text-gray",
                )}
              >
                {step.title}
              </span>
            </div>

            {/* خط بین دایره‌ها */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mt-[7px] h-px w-20 transition-colors",
                  isCompleted ? "bg-secondary" : "bg-gray",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
