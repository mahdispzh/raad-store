// ui/select-custom-select-ui.tsx
"use client";

import type { SelectInputProps, unitOptions } from "./select-input.types";
import { useSelectInput } from "./useSelectInput";

export function SelectInput({
  value = 0,
  unit = "toman",
  onChange,
  placeholder = "مقدار را وارد کنید",
  label = "عنوان",
  disabled = false,
}: SelectInputProps) {
  const {
    amount,
    selectedUnit,
    open,
    ref,
    setOpen,
    handleInputChange,
    selectUnit,
  } = useSelectInput(value, unit, onChange);

  const currentLabel = selectedUnit === "toman" ? "تومان" : "درصد";

  return (
    <div className="w-full max-w-[220px]" dir="rtl" ref={ref}>
      {label && (
        <p className="mb-1.5 font-medium text-sm text-gray-700">{label}</p>
      )}

      <div className="relative flex h-[38px] w-full items-center rounded-xs border border-gray-300 bg-white transition focus-within:border-blue-500">
        <input
          type="text"
          value={amount ? String(amount) : ""}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.target.value)}
          className="h-full flex-1 bg-transparent px-3 text-sm text-gray-800 outline-none"
        />

        <div className="h-5 w-[1px] bg-gray-200" />

        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((p) => !p)}
          className="flex h-full cursor-pointer items-center gap-1 px-3 text-sm whitespace-nowrap text-gray-600"
        >
          {currentLabel}
          <span
            className={`text-[10px] transition ${open ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>

        {open && (
          <div className="absolute top-[42px] left-0 z-50 w-[120px] overflow-hidden rounded-xs border border-gray-200 bg-white shadow-lg">
            {unitOptions.map((opt) => (
              <div
                key={opt.value}
                onClick={() => selectUnit(opt.value)}
                className="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
