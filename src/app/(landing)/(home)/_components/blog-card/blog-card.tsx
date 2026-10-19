import Image from "next/image";
import { AuthorIcon } from "@/src/shared/ui/icons/author-icon";
import { CalendarIcon } from "@/src/shared/ui/icons/calendar-icon";
import type { BlogCardProps } from "./blog-card-types";

export default function BlogCard({
  title,
  author,
  date,
  image,
}: BlogCardProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-border p-3 md:min-w-0 md:flex-1 md:flex-col md:gap-0 md:overflow-hidden md:p-0">
      {/* image */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg md:aspect-[4/3] md:h-auto md:w-full md:rounded-none">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col justify-between gap-3 md:flex-none md:p-4">
        {/* title */}
        <div className="flex items-start gap-2">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary md:mt-1.5" />
          <h3 className="text-xs text-foreground md:text-sm">{title}</h3>
        </div>

        {/* info */}
        <div className="flex items-center justify-between text-sm text-grey md:text-xs">
          <div className="flex items-center gap-1 md:hidden">
            <AuthorIcon className="text-2xs" />
            <p className="text-xs">{author}</p>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="text-xs" />
            <p className="text-xs">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}