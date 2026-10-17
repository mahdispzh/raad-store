import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import ProcessCard from "./process-card";
import { ProcessCards } from "./process-card-constants";

export default function ProcessCardSection() {
  return (
    <section className="flex flex-col gap-8 py-8 md:gap-10">
      {/* title */}
      <div className="page-px">
        <SectionTitle
          title="فرایند همکاری"
          description="از بررسی نیاز تا ساخت، تست و تحویل نهایی با تیم راد"
          size="sm"
        />
      </div>

      {/* cards */}
      <div className="page-px flex flex-col gap-10 md:flex-row md:gap-4">
        {ProcessCards.map((card) => (
          <ProcessCard
            key={card.id}
            number={card.number}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}