import { AboutUsIcon } from "@/src/shared/ui/icons/about-us-icon";
import { BlogsIcon } from "@/src/shared/ui/icons/blogs-icon";
import { ContactUsIcon } from "@/src/shared/ui/icons/contact-us-icon";
import { FaqIcon } from "@/src/shared/ui/icons/faq-icon";
import { HomeIcon } from "@/src/shared/ui/icons/home-icon";
import { ProductsIcon } from "@/src/shared/ui/icons/products-icon";
import { ServicesIcon } from "@/src/shared/ui/icons/services-icon";
import type { HeaderLink } from "./header-types";

export const HeaderLinks: HeaderLink[] = [
  { id: "home", label: "خانه", href: "/", icon: <HomeIcon /> },
  { id: "products", label: "محصولات", href: "/products", icon: <ProductsIcon /> },
  { id: "services", label: "خدمات", href: "/services", icon: <ServicesIcon /> },
  { id: "faq", label: "سوالات متداول", href: "/faq", icon: <FaqIcon /> },
  { id: "blog", label: "بلاگ", href: "/blog", icon: <BlogsIcon /> },
  { id: "about", label: "درباره ما", href: "/about-us", icon: <AboutUsIcon /> },
  { id: "contact", label: "تماس با ما", href: "/contact-us", icon: <ContactUsIcon /> },
];