import { Button } from "@/src/shared/ui/button/button";
import Image from "next/image";
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
      <div className="absolute inset-0 bg-foreground/40" />

      <div className="relative flex flex-col gap-6 px-4 pt-28 pb-8 md:w-7/12 md:gap-10 md:px-12 md:pt-32 md:pb-16">
        {/* title */}
        <h1 className="text-3xl leading-snug font-bold whitespace-pre-line text-primary md:text-5xl">
          {title}
        </h1>
        <p className="text-sm leading-7 text-background md:text-lg md:leading-8">
          {description}
        </p>

        {/* stats */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-3xl font-bold text-primary md:text-5xl">
                {stat.value}
              </span>
              <span className="text-sm text-primary md:text-lg">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-4">
          <Button
            variant="primary"
            size="sm"
            className="w-full md:h-14 md:text-base"
          >
            درخواست مشاوره
          </Button>
          <Button
            variant="primaryOutline"
            size="sm"
            className="w-full md:h-14 md:text-base"
          >
            مشاهده محصولات
          </Button>
        </div>
      </div>
    </section>
  );
}
