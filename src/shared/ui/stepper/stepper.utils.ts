export function getStepState(
  activeIndex: number,
  index: number,
) {
  const isCompleted = index < activeIndex;

  const isCurrent = index === activeIndex;

  const isActive = isCompleted || isCurrent;

  const circleBorderClass = isActive
    ? "border-danger"
    : "border-secondary/20";

  const dotClass = isActive
    ? "bg-danger"
    : "bg-transparent";

  const lineClass =
    index < activeIndex
      ? "bg-danger"
      : "bg-secondary/20";

  const textWeightClass = isActive
    ? "text-medium"
    : "text-medium";

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
