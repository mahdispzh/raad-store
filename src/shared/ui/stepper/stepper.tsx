"use client";

import {DEFAULT_STEPS} from "./stepper.constants";

import {getStepState} from "./stepper.utils";

import type {StepperProps} from "./stepper.types";

export function Stepper({
                          steps = DEFAULT_STEPS,
                          currentStep,
                          className = "",
                        }: StepperProps) {
  const activeIndex = steps.findIndex(
    (step) => step.id === currentStep,
  );

  const safeActiveIndex =
    activeIndex === -1 ? 0 : activeIndex;

  return (
    <div
      dir={"ltr"}
      className={"block"}
    >
      <div
        className={`flex items-center justify-center ${className}`}
      >
        <div className="flex items-start">
          {steps.map((step, index) => {
            const {
              isCompleted,
              isCurrent,

              circleBorderClass,
              dotClass,
              lineClass,
              textWeightClass,
            } = getStepState(
              safeActiveIndex,
              index,
            );

            return (
              <div
                key={step.id}
                className="flex items-center pb-4"
              >
                <div className="relative flex min-w-fit flex-col items-center">
                  <div
                    className={`
                    flex
                    h-[18px]
                    w-[18px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-all
                    duration-200
                    ${circleBorderClass}
                  `}
                >
                  {(isCompleted || isCurrent) && (
                    <div
                      className={`
                        h-[12px]
                        w-[12px]
                        rounded-full
                        ${dotClass}
                      `}
                    />
                  )}
                </div>

                      <span
                        className={`
                        absolute
                        pt-6
                        whitespace-nowrap
                        text-bold
                        text-md
                        text-primary
                        ${textWeightClass}
                      `}
                      >
                      {step.title}
                    </span>
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`
                    h-[1px]
                    w-[32px]
                    transition-all
                    duration-200
                    ${lineClass}
                  `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
