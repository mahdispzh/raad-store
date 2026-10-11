import Image from "next/image";
import type { CategoryCardProps } from "./category-card-types";

export default function CategoryCard({ title, image }: CategoryCardProps) {
  return (
    <div className="relative h-80 w-64 shrink-0 overflow-hidden rounded-3xl">
      {/* image */}
      <Image src={image} alt={title} fill className="object-cover" />

      {/* title */}
      <p className="absolute inset-x-0 bottom-0 bg-foreground/30 py-4 text-center text-lg text-background backdrop-blur-sm">
        {title}
      </p>
    </div>
  );
}