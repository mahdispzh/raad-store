import Image from "next/image";
import type { CertificateCardProps } from "./certificate-card-types";

export default function CertificateCard({
  title,
  image,
}: CertificateCardProps) {
  return (
    <div className="w-64 shrink-0 snap-start pe-4 md:w-1/6">
      <div className="relative aspect-[7/10] overflow-hidden rounded-xl border border-border bg-muted">
        {/* image */}
        <Image src={image} alt={title} fill className="object-cover" />

        {/* fade */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-muted to-transparent backdrop-blur-md [mask-image:linear-gradient(to_top,black_60%,transparent)]" />

        {/* title */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
          <span className="size-1.5 rounded-full bg-primary" />
          <p className="text-lg text-grey md:text-lg">{title}</p>
        </div>
      </div>
    </div>
  );
}