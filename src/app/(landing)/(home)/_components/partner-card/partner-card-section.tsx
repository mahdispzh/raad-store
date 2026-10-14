import { Button } from "@/src/shared/ui/button/button";
import { ChevronLeftIcon } from "@/src/shared/ui/icons/chevron-left-icon";
import PartnerCard from "./partner-card";
import { PartnerCards } from "./partner-card-constants";

export default function PartnerCardSection() {
  return (
    <section className="flex flex-col gap-6 bg-foreground py-10 md:flex-row md:items-stretch md:gap-0 md:py-12">
      {/* title */}
      <div className="flex flex-col px-4 md:w-96 md:shrink-0 md:justify-between md:px-10">
        <div className="flex flex-col gap-4 md:gap-6 md:text-center">
          <h2 className="text-3xl font-bold text-primary md:text-4xl md:leading-normal">
            همکاری های <br className="hidden md:block" />
            برق و صنعت راد
          </h2>
          <p className="text-base leading-7 text-background md:text-sm md:leading-6">
            از پروژه‌های صنعتی تا مجموعه‌های تخصصی، راهکارهای راد متناسب با
            نیاز هر پروژه
          </p>
          <button
            type="button"
            className="flex w-fit cursor-pointer items-center gap-1 text-sm text-primary md:hidden"
          >
            مشاهده همه
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="hidden flex-col gap-3 md:flex">
          <Button variant="primary" size="sm" className="w-full">
            مشاهده همه همکاری‌ها
          </Button>
          <Button variant="primaryOutline" size="sm" className="w-full">
            ارتباط با ما
          </Button>
        </div>
      </div>

      {/* cards */}
      <div className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto px-4 md:min-w-0 md:flex-1 md:px-0">
        {PartnerCards.map((card) => (
          <PartnerCard
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </section>
  );
}