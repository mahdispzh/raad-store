import Image from "next/image";
import type { SupplyCardProps } from "./supply-card-types";

export default function SupplyCard({ title, image }: SupplyCardProps) {
  return (
    <div className="w-64 shrink-0 snap-start pe-4 md:w-1/4 md:pe-6">
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        {/* image */}
        <div className="relative aspect-[4/3]">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* title */}
        <div className="flex items-center gap-2 p-4">
          <span className="size-1.5 rounded-full bg-primary" />
          <p className="text-base text-grey md:text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
}