// _hooks/use-navbar-landing.ts
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// ==================== هوک نوار لندینگ ====================
export function useNavbarLanding() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // تنظیم activeLink بر اساس مسیر فعلی
  useEffect(() => {
    const currentPath = pathname || "";
    
    if (currentPath === "/home" || currentPath === "/") {
      setActiveLink("home");
    } else if (currentPath.includes("/categories")) {
      setActiveLink("categories");
    } else if (currentPath.includes("/blogs")) {
      setActiveLink("blog");
    } else if (currentPath.includes("/tutorial")) {
      setActiveLink("tutorial");
    } else if (currentPath.includes("/app")) {
      setActiveLink("app");
    } else if (currentPath.includes("/faq")) {
      setActiveLink("faq");
    } else if (currentPath.includes("/about-us")) {
      setActiveLink("support");
    } else {
      setActiveLink("home"); // حالت پیش‌فرض
    }
  }, [pathname]);

  const handleActiveLink = (key: string) => {
    // فقط برای آیتم‌هایی که لینک هستند (غیر از categories)
    if (key !== "categories") {
      setActiveLink(key);
    }
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return {
    activeLink,
    isSearchOpen,
    handleActiveLink,
    openSearch,
    closeSearch,
  };
}