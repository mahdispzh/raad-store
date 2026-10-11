import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import CategoryCard from "./category-card";
import { CategoryCards } from "./category-card-constants";

export default function CategoryCardSection() {
  return (
    <section className="flex flex-col gap-6 py-8">
      <div className="px-4">
        <SectionTitle
          title="دسته‌بندی‌ها"
          description="محصولات و خدمات تخصصی برای تأمین، کنترل و توزیع مطمئن انرژی."
          size="sm"
        />
      </div>

      <div className="flex gap-4 overflow-x-auto px-4">
        {CategoryCards.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
    </section>
  );
}