// _constants/dashboard-navbar._constants.ts
import { BagIcon, UserIcon, UsersIcon } from "../../constants/icons";
import { FactorIcon } from "../../constants/icons/factor-icon";
import { HomeIcon } from "../../constants/icons/home-icon";
import { MoreVerticalIcon } from "../../constants/icons/more-vertical-icon";
import { ProductIcon } from "../../constants/icons/product-icon";
import { WalletIcon } from "../../constants/icons/wallet-icon";
import navbarTexts from "../../constants/texts/navbar.json";
import { DashboardNavLink } from "./navbar-dashboard.types";

// لینک‌های ناوبری داشبورد
export const dashboardLinks: DashboardNavLink[] = [
  { 
    key: "home", 
    label: navbarTexts.dashboard.home, 
    href: "/dashboard/home", 
    icon: <HomeIcon size="md" color="text-primary" /> 
  },
  { 
    key: "products", 
    label: navbarTexts.dashboard.products, 
    href: "/dashboard/products",
        icon: <ProductIcon  size="md" color="text-primary"/> 

  },
  { 
    key: "factors", 
    label: navbarTexts.dashboard.factors, 
    href: "/dashboard/factors",
    icon: <FactorIcon size="md" color="text-primary"/> 
  },
  { 
    key: "payments", 
    label: navbarTexts.dashboard.payments, 
    href: "/dashboard/payments",
    icon: <WalletIcon size="md" color="text-primary"/> 
  },
  {
    key: "more",
    label: navbarTexts.dashboard.storeInfo,
    href: "/more",
    icon: <MoreVerticalIcon size="sm" color="text-primary" /> 
  },
  {
    key: "profile",
    label: navbarTexts.dashboard.profile,
    href: "/profile/home",
    icon: <UsersIcon size="sm" color="text-primary" /> 
  },
  {
    key: "shop",
    label: navbarTexts.dashboard.shop,
    href: "/",
    icon: <BagIcon size="sm" color="text-primary" /> 
  }
];