import type { ProcessCardProps } from "./process-card-types";

export default function ProcessCard({
  number,
  title,
  description,
}: ProcessCardProps) {
  return (
    <div className="flex flex-col md:min-w-0 md:flex-1 md:rounded-xl md:border md:border-border md:p-4">
      {/* title */}
      <div className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-foreground md:size-6 md:text-xs">
          {number}
        </span>
        <h3 className="text-lg font-medium text-foreground md:text-sm">
          {title}
        </h3>
      </div>

      {/* description */}
      <p className="text-base font-light ps-11 text-base text-grey md:ps-9 md:text-xs md:leading-5">
        {description}
      </p>
    </div>
  );
}