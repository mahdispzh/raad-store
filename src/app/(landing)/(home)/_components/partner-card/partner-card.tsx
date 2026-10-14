import Image from "next/image";
import type { PartnerCardProps } from "./partner-card-types";

export default function PartnerCard({
  title,
  description,
  image,
}: PartnerCardProps) {
  return (
    <div className="w-72 shrink-0 snap-start pe-4 md:w-1/3">
      <div className="relative h-96 overflow-hidden rounded-2xl md:aspect-[3/4] md:h-auto">
        {/* image */}
        <Image src={image} alt={title} fill className="object-cover" />

        {/* blur */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-foreground/40 backdrop-blur-md [mask-image:linear-gradient(to_top,black_60%,transparent)]" />

        {/* text */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex flex-col gap-2 border-s-2 border-primary ps-2">
            <h3 className="text-base text-background">{title}</h3>
            <p className="text-xs text-muted">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}