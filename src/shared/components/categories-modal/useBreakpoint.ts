// hooks/useBreakpoint.ts
"use client";

import { useEffect, useState } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mobileQuery.matches) setBreakpoint("mobile");
      else if (desktopQuery.matches) setBreakpoint("desktop");
      else setBreakpoint("tablet");
    };

    update();
    mobileQuery.addEventListener("change", update);
    desktopQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      desktopQuery.removeEventListener("change", update);
    };
  }, []);

  return breakpoint;
}
