import Image from "next/image";
import { FooterLogos } from "./footer-constants";

export default function FooterLogoList() {
  return (
    <div className="flex gap-6 md:w-fit md:gap-6 md:rounded-2xl md:bg-background md:p-4">
      {FooterLogos.map((logo) => (
        <div
          key={logo.id}
          className="flex h-14 flex-1 items-center justify-center rounded-3xl bg-background p-2 md:h-auto md:flex-none md:rounded-none md:p-0"
        >
          <Image
            src={logo.image}
            alt={logo.name}
            className="h-full w-auto object-contain md:h-12"
          />
        </div>
      ))}
    </div>
  );
}