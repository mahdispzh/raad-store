// use-select.ts
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { SelectOption } from "./select.types";

export const useSelect = (options: SelectOption[], searchable?: boolean, disabled?: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, searchable]);

  const toggle = () => {
    if (!disabled) {
      setIsOpen((p) => !p);
    }
  };
  
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  // کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isOpen,
    toggle,
    close,
    open,
    search,
    setSearch,
    filteredOptions,
    ref,
  };
};