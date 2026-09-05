export interface StepperItem {
  id: string;
  title: string;
}

export interface StepperProps {
  steps: StepperItem[];

  currentStep: string;

  className?: string;
}
