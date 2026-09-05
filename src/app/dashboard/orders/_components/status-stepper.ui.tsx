// _components/status-stepper.ui.tsx
"use client";

import React from "react";
import { Text } from "@/src/shared/ui";
import { STATUS_STEPS } from "../_constants/factors.constants";
import { getStatusInfo } from "../_constants/status-icons";

interface StatusStepperProps {
  currentStatus: number;
  onStepClick: (step: number) => void;
}

export function StatusStepper({ currentStatus, onStepClick }: StatusStepperProps) {
  return (
    <div className="flex w-full px-4 py-4">
      {STATUS_STEPS.map((step, index) => {
        const isCompleted = step <= currentStatus;
        // ✅ تغییر: همه مراحل قابل انتخاب هستند
        const isAvailable = true; // یا step <= STATUS_STEPS.length

        const { label, icon } = getStatusInfo(
          step,
          isCompleted ? "white" : "secondary"
        );

        return (
          <div key={step} className="relative flex flex-1 flex-col items-center">
            {index !== STATUS_STEPS.length - 1 && (
              <div
                className={`absolute top-5 right-1/2 left-[-50%] mx-8 h-[2px]
                ${isCompleted ? "bg-secondary" : "bg-secondary"}`}
              />
            )}

            <button
              disabled={!isAvailable}
              onClick={() => onStepClick(step)}
              className={`
                relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-[3px]
                transition-all
                ${
                  isCompleted
                    ? "bg-secondary border-secondary"
                    : "bg-white border-secondary"
                }
                ${isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
              `}
            >
              {icon}
            </button>

            <div className="mt-2">
              <Text
                text={label}
                size="sm"
                weight="regular"
                color={isCompleted ? "primary" : "secondary"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}