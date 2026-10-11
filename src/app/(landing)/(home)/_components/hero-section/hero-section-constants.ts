import type { HeroSectionProps } from "./hero-section-type";
import heroImage from "./hero-section-image.svg";

export const HeroSectionData: HeroSectionProps = {
  title: "برق و صنعت راد؛\nمهندسی‌شده برای عملکردی مطمئن",
  description:
    "طراحی، تامین و مونتاژ انواع تابلوهای برق صنعتی و ساختمانی با تمرکز بر ایمنی، کیفیت و عملکرد پایدار",
  stats: [
    { value: "+۱۰", label: "سال تجربه و تخصص" },
    { value: "+۲۰۰", label: "پروژه و همکاری موفق" },
    { value: "+۵۰", label: "نیرو متخصص و فعال" },
  ],
  image: heroImage.src,
};