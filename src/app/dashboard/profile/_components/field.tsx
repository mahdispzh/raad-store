"use client";

import { Text } from "@/src/shared/ui";

interface FieldProps {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
}

export function Field({
  label,
  value,
  editing,
  onChange,
  type = "text",
}: FieldProps) {
  return (
    <div className="flex flex-col gap-[0.4vw]">
      <Text text={label} size="md" weight="medium" />
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-medium h-[2.6vw] rounded-[0.4vw] border border-gray-300 px-[0.75vw] text-sm text-primary outline-none focus:border-secondary"
        />
      ) : (
        <Text text={value} size="sm" weight="medium" color="secondary" />
      )}
    </div>
  );
}
