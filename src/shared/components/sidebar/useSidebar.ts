// _hooks/use-sidebar.ts
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import menuItems from "../../constants/texts/sidebar.json";

// ==================== هوک سایدبار ====================
export function useSidebar() {
  const pathname = usePathname() || "";

  // آیتم فعال رو مستقیماً از روی link خود آیتم‌ها تشخیص می‌ده،
  // نه یه لیست هاردکد جدا که ممکنه با مسیر واقعی هماهنگ نباشه.
  const selected = useMemo(() => {
    const match = (menuItems as Array<{ icon: string; link?: string }>).find(
      (item) => {
        // آیتمی مثل "exit" لینک نداره، پس اصلاً نباید فعال تشخیص داده بشه
        if (!item.link) return false;

        const fullPath = "/profile" + item.link;

        if (item.link === "" || item.link === "/") {
          // آیتم صفحه‌ی اصلی پروفایل: فقط تطبیق دقیق
          return pathname === "/profile" || pathname === "/profile/";
        }

        return pathname === fullPath || pathname.startsWith(fullPath + "/");
      },
    );

    return match?.icon ?? "home";
  }, [pathname]);

  // نگه داشته شده برای سازگاری با UI فعلی (روی <Link> صدا زده می‌شه).
  // چون `selected` حالا مستقیم از pathname مشتق می‌شه، این تابع دیگه
  // نیازی به آپدیت state نداره؛ فقط برای موارد غیر-Link (مثل "exit") استفاده می‌شه.
  const handleSelect = (_key: string) => {};

  return {
    selected,
    handleSelect,
  };
}