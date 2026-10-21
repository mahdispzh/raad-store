import type { FooterLink, FooterLogo, FooterPhone } from "./footer-types";
import enamadLogo from "./enamad.svg";
import thirdLogo from "./nezam-image.svg";
import knowledgeBasedLogo from "./danesh-image.svg";

export const QuickLinks: FooterLink[] = [
  { id: "home", label: "صفحه اصلی", href: "/" },
  { id: "products", label: "محصولات", href: "/products" },
  { id: "services", label: "خدمات", href: "/services" },
  { id: "projects", label: "پروژه‌ها", href: "/projects" },
  { id: "about", label: "درباره ما", href: "/about-us" },
  { id: "faq", label: "سوالات متداول", href: "/faq" },
  { id: "contact", label: "تماس با ما", href: "/contact-us" },
];

export const ProductLinks: FooterLink[] = [
  { id: "distribution", label: "تابلو توزیع برق", href: "#" },
  { id: "changeover", label: "تابلو برق چنج‌آور", href: "#" },
  { id: "facilities", label: "تابلو برق تاسیسات و موتورخانه", href: "#" },
  { id: "control", label: "تابلو برق کنترل", href: "#" },
  { id: "monitoring", label: "تابلو برق مانیتورینگ و اسکادا", href: "#" },
  { id: "industrial", label: "تابلو برق صنعتی", href: "#" },
];

export const ServiceLinks: FooterLink[] = [
  { id: "design", label: "طراحی تابلو برق", href: "#" },
  { id: "supply", label: "تامین تجهیزات", href: "#" },
  { id: "assembly", label: "مونتاژ قطعات", href: "#" },
  { id: "quality", label: "تست و کنترل کیفیت", href: "#" },
  { id: "installation", label: "نصب و راه‌اندازی", href: "#" },
  { id: "support", label: "پشتیبانی فنی", href: "#" },
];

export const FooterPhones: FooterPhone[] = [
  { id: "office", label: "دفتر مرکزی:", number: "۰۹۱۷۲۴۷۳۸۸۰ - ۰۹۱۷۲۴۷۳۸۸۰" },
  { id: "support", label: "پشتیبان فنی:", number: "۰۹۱۷۲۴۷۳۸۸۰ - ۰۹۱۷۲۴۷۳۸۸۰" },
  { id: "sales", label: "کارشناس فروش:", number: "۰۹۱۷۲۴۷۳۸۸۰ - ۰۹۱۷۲۴۷۳۸۸۰" },
];

export const FooterLogos: FooterLogo[] = [
  { id: "enamad", name: "نماد اعتماد الکترونیکی", image: enamadLogo },
  { id: "third", name: "نشان سوم", image: thirdLogo },
  { id: "knowledge-based", name: "دانش بنیان", image: knowledgeBasedLogo },
];