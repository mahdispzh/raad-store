import Image from "next/image";
import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import { Brands } from "./brand-section-constants";

const LoopBrands = [...Brands, ...Brands, ...Brands, ...Brands];

export default function BrandSection() {
  return (
    <section className="flex flex-col gap-8 py-8">
      {/* title */}
      <div className="page-px">
        <SectionTitle
          title="برندهای معتبر، کیفیت مطمئن"
          description="انتخاب تجهیزات از برندهای معتبر جهانی برای تضمین کیفیت و دوام محصولات راد."
          size="sm"
        />
      </div>

      {/* logos */}
      <div dir="ltr" className="overflow-hidden">
        <div className="flex w-max animate-marquee items-center">
          {LoopBrands.map((brand, index) => (
            <Image
              key={`${brand.id}-${index}`}
              src={brand.image}
              alt={brand.name}
              className="me-10 h-10 w-auto shrink-0 md:h-16 md:me-16"
            />
          ))}
        </div>
      </div>
    </section>
  );
}