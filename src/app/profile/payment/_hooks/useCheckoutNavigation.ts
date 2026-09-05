// src/app/profile/payment/_hooks/useCheckoutNavigation.ts

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { STEPS } from "../_constants/payment.data";
import type { Step } from "../_types/common.types";

export function useCheckoutNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step") as Step | null;

  const [step, setStepState] = useState<Step>(() => {
    if (stepParam && STEPS.includes(stepParam)) return stepParam;
    return STEPS[0]!;
  });

  const setStep = (newStep: Step) => {
    setStepState(newStep);
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", newStep);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const goToNextStep = () => {
    const currentIndex = STEPS.indexOf(step);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1];
      if (nextStep) setStep(nextStep);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = STEPS.indexOf(step);
    if (currentIndex > 0) {
      const prevStep = STEPS[currentIndex - 1];
      if (prevStep) setStep(prevStep);
    }
  };

  useEffect(() => {
    if (stepParam && STEPS.includes(stepParam) && stepParam !== step) {
      setStepState(stepParam);
    }
  }, [stepParam]);

  return {
    step,
    goToNextStep,
    goToPrevStep,
    setStep,
  };
}
