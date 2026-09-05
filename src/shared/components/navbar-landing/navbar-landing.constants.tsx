// _constants/landing-navbar._constants.ts

import { BookIcon } from "../../constants/icons/book-icon";
import { EducationIcon } from "../../constants/icons/education-icon";
import { HomeIcon } from "../../constants/icons/home-icon";
import { MenuIcon } from "../../constants/icons/menu-icon";
import { PhoneIcon } from "../../constants/icons/phone-icon";
import { QuestionIcon } from "../../constants/icons/question-icon";
import { SupportIcon } from "../../constants/icons/support-icon";
import navbarTexts from "../../constants/texts/navbar.json";
import { NavLink } from "./navbar-landing.types";

// Destructure کردن landing از آبجکت اصلی
const { landing } = navbarTexts;

// لینک‌های ناوبری لندینگ
export const navLinks: NavLink[] = [
  {
    key: "home",
    label: landing.home,
    href: "/",
    icon: <HomeIcon size="sm" color="text-primary" />,
  },
  {
    key: "categories",
    label: landing.category,
    href: "/categories",
    icon: <MenuIcon size="sm" color="text-primary" />,
  },
  {
    key: "blog",
    label: landing.blog,
    href: "/blogs",
    icon: <BookIcon size="sm" color="text-primary" />,
  },
  {
    key: "tutorial",
    label: landing.tutorial,
    href: "/tutorial",
    icon: <EducationIcon size="sm" color="text-primary" />,
  },
  {
    key: "app",
    label: landing.app,
    href: "/application",
    icon: <PhoneIcon size="sm" color="text-primary" />,
  },
  {
    key: "faq",
    label: landing.faq,
    href: "/faq",
    icon: <QuestionIcon size="sm" color="text-primary" />,
  },
  {
    key: "support",
    label: landing.support,
    href: "/about-us",
    icon: <SupportIcon size="sm" color="text-primary" />,
  },
];
