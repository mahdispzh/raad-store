import Image from "next/image";
import type { CategoryCardProps } from "./category-card-types";

export default function CategoryCard({ title, image }: CategoryCardProps) {
  return (
    <div className="relative h-80 w-64 shrink-0 snap-start overflow-hidden rounded-2xl md:h-72 md:w-auto md:min-w-56 md:flex-1">
      {/* image */}
      <Image src={image} alt={title} fill className="object-cover" />

      {/* title */}
      <p className="absolute inset-x-0 bottom-0 bg-foreground/30 px-2 pb-4 pt-10 text-center text-lg text-background backdrop-blur-md [mask-image:linear-gradient(to_top,black_60%,transparent)] md:text-sm">
        {title}
      </p>
    </div>
  );
}
