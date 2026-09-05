// _constants/footer._constants.ts

import { DiscountIcon } from "../../constants/icons/discount-icon";
import { GiftIcon } from "../../constants/icons/gift-icon";
import { SupportIcon } from "../../constants/icons/support-icon";
import { TruckIcon } from "../../constants/icons/truck-icon";
import { FeatureItem, FooterItem } from "./footer.types";

// آیتم‌های ویژگی‌های فوتر
export const features: FeatureItem[] = [
  { icon: <TruckIcon size="xl" color="text-secondary" />, key: "fastShipping" },
  {
    icon: <DiscountIcon size="xl" color="text-secondary" />,
    key: "returnGuarantee",
  },
  {
    icon: <GiftIcon size="xl" color="text-secondary" />,
    key: "specialPackaging",
  },
  { icon: <SupportIcon size="xl" color="text-secondary" />, key: "support" },
];

// آیتم‌های فروشگاه
export const shopItems: FooterItem[] = [
  { key: "shopNewProducts", href: "/products" },
  { key: "shopWomenBags", href: "/products" },
  { key: "shopWomenShoes", href: "/products" },
  { key: "shopPants", href: "/products" },
  { key: "shopBlouse", href: "/products" },
  { key: "shopDiscounts", href: "/products" },
];

// آیتم‌های خدمات مشتریان
export const customerItems: FooterItem[] = [
  { key: "customerOrderTracking", href: "/profile/orders" },
  { key: "customerReturnPolicy", href: "/faq" },
  { key: "customerFaq", href: "/faq" },
  { key: "customerContactUs", href: "/about-us" },
];

// آیتم‌های برند
export const brandItems: FooterItem[] = [
  { key: "brandAboutUs", href: "/about-us" },
  { key: "brandBlog", href: "/blogs" },
  { key: "brandPrivacy", href: "/terms" },
];

// کامپوننت جداکننده عمودی (با export const)
export const VerticalSeparator = () => {
  return <div className="h-5 w-px bg-gray" />;
};
