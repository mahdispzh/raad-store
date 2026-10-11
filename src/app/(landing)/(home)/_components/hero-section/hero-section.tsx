import Image from "next/image";
import { Button } from "@/src/shared/ui/button/button";
import type { HeroSectionProps } from "./hero-section-type";

export default function HeroSection({
  title,
  description,
  stats,
  image,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* background */}
      <Image src={image} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative flex flex-col gap-6 px-4 pb-8 pt-28">
        {/* title */}
        <h1 className="whitespace-pre-line text-3xl font-bold leading-snug text-primary">
          {title}
        </h1>
        <p className="text-sm leading-7 text-background">{description}</p>

        {/* stats */}
        <div className="flex flex-col gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-3xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-primary">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div className="flex flex-col gap-3">
          <Button variant="primary" size="sm" className="w-full">
            درخواست مشاوره
          </Button>
          <Button variant="primaryOutline" size="sm" className="w-full">
            مشاهده محصولات
          </Button>
        </div>
      </div>
    </section>
  );
}