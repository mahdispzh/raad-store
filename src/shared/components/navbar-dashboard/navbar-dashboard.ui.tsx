// ui/navbar-dashboard.ui.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { NotificationIcon } from "../../constants/icons/notification-icon";
import { Badge, Text } from "../../ui";
import { dashboardLinks } from "./navbar-dashboard.constants";
import { useNavbarDashboard } from "./useNavbarDashboard";

// Dashboard Navbar Component
export function NavbarDashboard() {
  const { activeLink, handleActiveLink } = useNavbarDashboard();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xl">
      <div className="max-w-screen-4xl relative mx-auto flex w-full items-center gap-6 overflow-visible px-6 py-4">
        {/* Logo Section - left */}
        <div className="flex-shrink-0">
          <Link href="/" className="shrink-0 cursor-pointer">
            <Image src="/images/logo.svg" width={141} height={51} alt="logo" />
          </Link>
        </div>

        {/* Navigation Links - center */}
        <nav className="flex-1 flex items-center justify-center gap-7 font-medium text-sm">
          {dashboardLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => handleActiveLink(link.key)}
              className={`group relative flex items-center gap-2 py-1 whitespace-nowrap transition-all duration-200 ${
                activeLink === link.key
                  ? "text-primary [text-shadow:var(--shadow-xl)]"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              {/* Icon */}
              <span className="flex-shrink-0">
                {link.icon}
              </span>
              
              {/* Link Text */}
              <Text
                text={link.label}
                size="lg"
                weight={activeLink === link.key ? "bold" : "regular"}
                color="primary"
              />
              
              {/* Active/Hover Underline */}
              <span className="absolute right-0 bottom-0 h-[0.01vw] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Notification Button - right */}
        <div className="flex-shrink-0">
          <button className="group relative cursor-pointer rounded-full p-1.5 transition-all duration-200">
            <NotificationIcon
              size="md"
              color="text-gray-700 group-hover:text-primary transition-colors duration-200"
            />
            <Badge type="number" number={1} />
          </button>
        </div>
      </div>
    </header>
  );
}