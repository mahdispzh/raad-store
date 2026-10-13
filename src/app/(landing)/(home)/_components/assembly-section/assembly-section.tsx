import Image from "next/image";
import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import { StandardsIcon } from "@/src/shared/ui/icons/standards-icon";
import { PrecisionToolsIcon } from "@/src/shared/ui/icons/precision-tools-icon";
import { QualityControlIcon } from "@/src/shared/ui/icons/quality-control-icon";
import AssemblySectionFeature from "./assembly-section-feature";
import type { AssemblySectionProps } from "./assembly-section-types";

export default function AssemblySection({
  title,
  description,
  heading,
  text,
  image,
}: AssemblySectionProps) {
  return (
    <section className="flex flex-col gap-6 py-8">
      {/* title */}
      <div>
        <SectionTitle title={title} description={description} size="sm" />
      </div>

      {/* banner */}
      <div className="relative overflow-hidden">
        <Image src={image} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-foreground/20" />

        <div className="relative flex flex-col gap-10 px-4 py-16 md:w-1/2 md:gap-6 md:px-12 md:py-12">
          <h2 className="whitespace-pre-line text-3xl font-bold leading-snug text-primary">
            {heading}
          </h2>
          <p className="text-justify text-base leading-8 text-background md:text-sm md:leading-7">{text}</p>

          {/* features */}
          <div className="grid grid-cols-3 divide-x divide-background/30">
            <AssemblySectionFeature
              icon={<StandardsIcon />}
              label="رعایت استانداردهای فنی"
            />
            <AssemblySectionFeature
              icon={<PrecisionToolsIcon />}
              label="استفاده از ابزار دقیق"
            />
            <AssemblySectionFeature
              icon={<QualityControlIcon />}
              label="کنترل کیفیت در حین مونتاژ"
            />
          </div>
        </div>
      </div>
    </section>
  );
}