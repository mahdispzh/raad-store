//هوک داخلی برای مدیریت باز و بسته شدن، جستجو و انتخاب
import { useState, useMemo } from "react";
import { SelectOption } from "./select.types";

export const useSelect = (
  options: SelectOption[],
  searchable?: boolean
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchable || !search) return options;
    return options.filter((o) =>
      o.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, searchable]);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    close,
    search,
    setSearch,
    filteredOptions,
  };
};
