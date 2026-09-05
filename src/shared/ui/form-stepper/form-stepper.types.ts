export type Step = {
  id: number | string;
  title: string;
};

export type FormStepperProps = {
  steps: Step[];
  currentStep: number | string;
  className?: string;
};
