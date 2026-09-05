"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Text } from "@/src/shared/ui";

export function BlogBreadcrumb() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    return pathname
      .split("/")
      .filter(Boolean)
      .map((item) =>
        decodeURIComponent(item)
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
      );
  }, [pathname]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {breadcrumbs.map((item, index) => (
        <div key={item} className="flex items-center gap-2">
          <Text
            text={item}
            size="sm"
            color={index === breadcrumbs.length - 1 ? "secondary" : "gray"}
          />

          {index !== breadcrumbs.length - 1 && (
            <span className="text-gray">/</span>
          )}
        </div>
      ))}
    </div>
  );
}
