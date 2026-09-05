// _components/transactions-filter-modal.ui.tsx
"use client";

import { useState } from "react";

import { CustomSelect, DefaultButton, Modal, Text } from "@/src/shared/ui";
import { DatePickerField } from "@/src/shared/ui/calendar-hijri/calendar-hijri";
import { Checkbox } from "@/src/shared/ui/check-box/checkbox.ui";

export interface TransactionsFilters {
  statusEnabled: boolean;
  status: "all" | "success" | "failed" | "pending" | "unknown";
  dateEnabled: boolean;
  datePreset: string;
  fromDate: string; // ISO date string, ready for `new Date(...)` on the backend
  toDate: string; // ISO date string, ready for `new Date(...)` on the backend
  amountEnabled: boolean;
  amountFrom: string;
  amountTo: string;
}

interface TransactionsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: TransactionsFilters) => void;
}

const STATUS_OPTIONS: {
  label: string;
  value: TransactionsFilters["status"];
}[] = [
  { label: "همه", value: "all" },
  { label: "موفق", value: "success" },
  { label: "ناموفق", value: "failed" },
  { label: "در انتظار", value: "pending" },
  { label: "نامشخص", value: "unknown" },
];

const DATE_PRESET_OPTIONS = ["ماه جاری", "هفته جاری", "امروز", "بازه دلخواه"];

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// تبدیل عدد فارسی/عربی به لاتین برای اینکه Number() درست پارسش کنه
function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function TransactionsFilterModal({
  isOpen,
  onClose,
  onApply,
}: TransactionsFilterModalProps) {
  const [statusEnabled, setStatusEnabled] = useState(false);
  const [status, setStatus] =
    useState<TransactionsFilters["status"]>("success");

  const [dateEnabled, setDateEnabled] = useState(false);
  const [datePreset, setDatePreset] = useState<string>(
    DATE_PRESET_OPTIONS[0] ?? "ماه جاری",
  );
  // مقدار واقعی Date نگه داشته میشه، نه رشته‌ی نمایشی جلالی،
  // چون تبدیل به رشته‌ی fa-IR باعث میشد new Date() سمت سرور نتونه پارسش کنه
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [amountEnabled, setAmountEnabled] = useState(false);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  const handleCancel = () => {
    onClose();
  };

  const handleCheckboxChange = (
    type: "status" | "date" | "amount",
    checked: boolean,
  ) => {
    setStatusEnabled(type === "status" ? checked : false);
    setDateEnabled(type === "date" ? checked : false);
    setAmountEnabled(type === "amount" ? checked : false);
  };

  const handleConfirm = () => {
    onApply({
      statusEnabled,
      status,
      dateEnabled,
      datePreset,
      fromDate: fromDate ? fromDate.toISOString() : "",
      toDate: toDate ? toDate.toISOString() : "",
      amountEnabled,
      amountFrom,
      amountTo,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{ width: "510px", maxWidth: "510px", minWidth: "510px" }}
        className="flex flex-col rounded-xs bg-pure-white shadow-xl"
      >
        <div className="border-b border-gray p-5">
          <Text text="فیلتر ها" size="md" weight="medium" color="primary" />
        </div>

        <div className="flex flex-col gap-1 px-5 py-4">
          {/* وضعیت */}
          <div className="flex flex-col gap-3 pb-6">
            <Checkbox
              label="وضعیت"
              checked={statusEnabled}
              onChange={(checked) => handleCheckboxChange("status", checked)}
              variant="primary"
            />
            {statusEnabled && (
              <div className="flex flex-col gap-1.5 pb-3">
                <CustomSelect
                  options={STATUS_OPTIONS}
                  value={status}
                  onChange={(value) =>
                    setStatus(value as TransactionsFilters["status"])
                  }
                  placeholder="انتخاب وضعیت"
                />
              </div>
            )}
          </div>

          {/* بر اساس تاریخ */}
          <div className="flex flex-col gap-3 pb-6">
            <Checkbox
              label="بر اساس تاریخ"
              checked={dateEnabled}
              onChange={(checked) => handleCheckboxChange("date", checked)}
              variant="primary"
            />
            {dateEnabled && (
              <div className="flex flex-col gap-1.5 pb-3">
                <div className="flex flex-row items-center gap-2">
                  <DatePickerField
                    className="text-regular"
                    placeholder="از تاریخ"
                    {...(fromDate ? { value: fromDate } : {})}
                    onChange={(d) => setFromDate(d ?? null)}
                  />
                  <Text text="|" size="sm" color="secondary" weight="regular" />
                  <DatePickerField
                    className="text-regular"
                    placeholder="تا تاریخ"
                    {...(toDate ? { value: toDate } : {})}
                    onChange={(d) => setToDate(d ?? null)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* مبلغ */}
          <Checkbox
            label="مبلغ"
            checked={amountEnabled}
            onChange={(checked) => handleCheckboxChange("amount", checked)}
            variant="primary"
          />
          {amountEnabled && (
            <div className="flex flex-col gap-1.5 pb-3">
              <Text text="از" size="sm" color="secondary" weight="regular" />
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={amountFrom}
                  onChange={(e) =>
                    setAmountFrom(normalizeDigits(e.target.value))
                  }
                  className="text-regular h-10 w-full rounded-sm border border-gray px-3 py-2 pl-8 text-sm text-primary outline-none"
                />
                <span className="text-regular absolute top-1/2 left-3 -translate-y-1/2 text-sm text-secondary">
                  ریال
                </span>
              </div>

              <Text text="تا" size="sm" color="secondary" weight="regular" />
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={amountTo}
                  onChange={(e) => setAmountTo(normalizeDigits(e.target.value))}
                  className="text-regular h-10 w-full rounded-sm border border-gray px-3 py-2 pl-8 text-sm text-primary outline-none"
                />
                <span className="text-regular absolute top-1/2 left-3 -translate-y-1/2 text-sm text-secondary">
                  ریال
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center justify-end gap-2 p-4">
          <DefaultButton
            type="secondary"
            style="outline"
            label="انصراف"
            action={handleCancel}
          />
          <DefaultButton
            type="secondary"
            style="fill"
            label="تایید"
            action={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}
