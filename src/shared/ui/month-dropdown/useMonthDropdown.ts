"use client";

import { useEffect, useRef, useState } from "react";

export function useMonthDropdown(onSelectMonth: (month: string) => void) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // با کلیک بیرون از دراپ‌داون، بسته بشه
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggle = () => setIsOpen((open) => !open);

  const select = (month: string) => {
    onSelectMonth(month);
    setIsOpen(false);
  };

  return { dropdownRef, isOpen, toggle, select };
}