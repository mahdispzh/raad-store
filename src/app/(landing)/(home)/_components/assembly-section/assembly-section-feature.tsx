import type { AssemblySectionFeatureProps } from "./assembly-section-types";

export default function AssemblySectionFeature({
  icon,
  label,
}: AssemblySectionFeatureProps) {
  return (
    <div className="flex flex-col items-center gap-4 px-2 text-center md:gap-3">
      <span className="text-4xl text-primary md:text-3xl">{icon}</span>
      <p className="text-base text-primary md:text-sm">{label}</p>
    </div>
  );
}
