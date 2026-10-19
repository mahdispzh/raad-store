import { Button } from "@/src/shared/ui/button/button";
import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import BlogCard from "./blog-card";
import { BlogCards } from "./blog-card-constants";
import { ArrowLeftIcon } from "@/src/shared/ui/icons/arrow-left-icon";

export default function BlogCardSection() {
  return (
    <section className="flex flex-col gap-6 py-8 md:gap-8">
      {/* title */}
      <div className="page-px flex items-end justify-between md:items-start">
        <SectionTitle
          title="بلاگ آموزشی"
          description="آموزش و نکاتی کاربردی برای یادگیری و انتخاب صحیح‌تر"
          size="mobileSize"
        />
        <Button variant="primary" size="mobileSize" icon={<ArrowLeftIcon className="size-3" />}>
          مشاهده بیشتر
        </Button>
      </div>

      {/* cards */}
      <div className="page-px flex flex-col gap-4 md:flex-row">
        {BlogCards.map((card) => (
          <BlogCard
            key={card.id}
            title={card.title}
            author={card.author}
            date={card.date}
            image={card.image}
          />
        ))}
      </div>
    </section>
  );
}