import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import type { ServiceCardProps } from "./service-card-types";

export default function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <div className="rounded-xl border border-border p-5 md:flex-1 md:rounded-md">
      <SectionTitle title={title} description={description} size="sm" />
    </div>
  );
}