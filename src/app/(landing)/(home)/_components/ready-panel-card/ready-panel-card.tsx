import Image from "next/image";
import type { ReadyPanelCardProps } from "./ready-panel-card-types";

export default function ReadyPanelCard({ title, image }: ReadyPanelCardProps) {
  return (
    <div className="w-72 shrink-0 snap-start rounded-xl border border-border bg-background p-2 md:w-70">
      {/* image */}
      <div className="relative h-52 overflow-hidden rounded-xl">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* title */}
      <div className="flex items-center gap-2 p-3">
        <span className="size-1.5 rounded-full bg-primary" />
        <p className="text-sm text-grey">{title}</p>
      </div>
    </div>
  );
}