"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/src/shared/ui/icons/chevron-down-icon";
import type { FooterLinkGroupProps } from "./footer-types";

export default function FooterLinkGroup({
  title,
  links,
}: FooterLinkGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-background/20 md:flex-1 md:border-0">
      {/* title */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between py-4 text-sm text-primary md:cursor-default md:pt-0 md:text-base"
      >
        {title}
        <ChevronDownIcon
          className={`text-base md:hidden ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* links */}
      <div
        className={`flex-col gap-3 pb-4 md:flex md:pb-0 ${isOpen ? "flex" : "hidden"}`}
      >
        {links.map((link) => (
          <a key={link.id} href={link.href} className="text-sm text-background">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}