// _hooks/use-select-select.ts
import { useEffect, useRef, useState } from "react";
import { UnitType } from "./select-input.types";

// هوک مدیریت state و منطق سلکت‌ایمپوت
export function useSelectInput(
  initialValue: number = 0,
  initialUnit: UnitType = "toman",
  onChange?: (data: { amount: number; unit: UnitType }) => void,
) {
  const [amount, setAmount] = useState<number>(initialValue);
  const [selectedUnit, setSelectedUnit] = useState<UnitType>(initialUnit);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ارسال داده به والد
  const emit = (a: number, u: UnitType) => {
    onChange?.({ amount: a, unit: u });
  };

  // هندلر تغییر مقدار ورودی
  const handleInputChange = (val: string) => {
    const numeric = Number(val.replace(/[^\d]/g, ""));
    const safe = isNaN(numeric) ? 0 : numeric;
    setAmount(safe);
    emit(safe, selectedUnit);
  };

  // هندلر انتخاب واحد
  const selectUnit = (u: UnitType) => {
    setSelectedUnit(u);
    setOpen(false);
    emit(amount, u);
  };

  // بستن دراپ‌داون با کلیک خارج
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return {
    amount,
    selectedUnit,
    open,
    ref,
    setOpen,
    handleInputChange,
    selectUnit,
  };
}
