"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SelectOption } from "./select.types";

export const useSelect = (options: SelectOption[], searchable?: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return options;

    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, searchable]);

  const toggle = () => setIsOpen((p) => !p);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
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
    search,
    setSearch,
    filteredOptions,
    ref,
  };
};
