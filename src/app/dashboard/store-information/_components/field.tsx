"use client";

import { Text } from "@/src/shared/ui";

interface FieldProps {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  isTextarea?: boolean;
}

export function Field({
  label,
  value,
  editing,
  onChange,
  isTextarea,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-[0.4vw]">
      <Text text={label} size="md" weight="medium" />
      {editing ? (
        isTextarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="text-medium rounded-[0.4vw] border border-gray-300 px-[0.75vw] py-[0.5vw] text-sm text-primary outline-none focus:border-secondary"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="text-medium h-[2.6vw] rounded-[0.4vw] border border-gray-300 px-[0.75vw] text-sm text-primary outline-none focus:border-secondary"
          />
        )
      ) : (
        <Text text={value} size="sm" weight="medium" color="secondary" />
      )}
    </div>
  );
}
