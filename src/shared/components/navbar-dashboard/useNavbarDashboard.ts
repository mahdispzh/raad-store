// _hooks/use-navbar-dashboard.ts
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// ==================== هوک نوار داشبورد ====================
export function useNavbarDashboard() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("home");

  // تنظیم activeLink بر اساس مسیر فعلی
  useEffect(() => {
    const currentPath = pathname || "";

    if (currentPath.includes("/dashboard/home")) {
      setActiveLink("home");
    } else if (currentPath.includes("/dashboard/products")) {
      setActiveLink("products");
    } else if (currentPath.includes("/dashboard/factors")) {
      setActiveLink("factors");
    } else if (currentPath.includes("/dashboard/payments")) {
      setActiveLink("payments");
    } else if (currentPath.includes("/more")) {
      setActiveLink("more");
    } else {
      setActiveLink("home"); // حالت پیش‌فرض
    }
  }, [pathname]);

  const handleActiveLink = (key: string) => {
    setActiveLink(key);
  };

  return { activeLink, handleActiveLink };
}
