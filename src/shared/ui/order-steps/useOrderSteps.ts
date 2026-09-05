export function useOrderSteps(currentStep: number, index: number) {
  const isCompleted = index < currentStep;
  const isCurrent = index === currentStep;
  const isActive = isCompleted || isCurrent;

  const circleBorderClass = isActive 
    ? "border-danger border-2" 
    : "border-secondary/20 border-2";

  const dotClass = isActive 
    ? "bg-danger" 
    : "bg-transparent";

  const lineClass = index < currentStep 
    ? "bg-danger" 
    : "bg-secondary/20";

  const textWeightClass = isActive 
    ? "text-medium" 
    : "text-regular";

  return {
    isCompleted,
    isCurrent,
    isActive,
    circleBorderClass,
    dotClass,
    lineClass,
    textWeightClass,
  };
}