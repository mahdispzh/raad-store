import Image from "next/image";
import { Button } from "@/src/shared/ui/button/button";
import type { CtaSectionProps } from "./cta-section-types";

export default function CtaSection({
  title,
  description,
  tags,
  image,
  desktopImage,
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* background: mobile */}
      <Image src={image} alt="" fill className="object-cover md:hidden" />
      <div className="absolute inset-0 bg-foreground/50 md:hidden" />

      {/* background: desktop */}
<div className="absolute inset-y-0 left-0 hidden w-9/12 md:block">
  <Image src={desktopImage} alt="" fill className="object-cover" />
</div>
      <div className="absolute inset-y-0 right-0 hidden w-7/12 bg-primary [clip-path:polygon(47%_0,100%_0,100%_100%,0_100%)] md:block" />

      <div className="relative flex flex-col gap-6 px-4 py-16 md:w-7/12 md:gap-5 md:px-12 md:py-14">
        {/* title */}
        <h2 className="text-2xl leading-snug font-bold text-primary md:text-foreground">
          {title}
        </h2>
        <p className="text-base leading-7 text-background md:text-sm md:text-foreground">
          {description}
        </p>

        {/* tags */}
        <div className="grid grid-cols-3 gap-3 md:flex">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm text-foreground md:bg-foreground md:px-5 md:text-xs md:text-background"
            >
              <span className="size-1.5 rounded-full bg-foreground md:bg-background" />
              {tag}
            </span>
          ))}
        </div>

        {/* buttons: mobile */}
        <div className="flex flex-col gap-3 md:hidden">
          <Button variant="primary" className="w-full">
            درخواست مشاوره
          </Button>
          <Button variant="primaryOutline" className="w-full">
            تماس مستقیم
          </Button>
        </div>

        {/* buttons: desktop */}
        <div className="hidden gap-3 md:flex">
          <Button variant="dark" size="sm">
            درخواست مشاوره
          </Button>
          <Button variant="outline" size="sm">
            تماس مستقیم
          </Button>
        </div>
      </div>
    </section>
  );
}