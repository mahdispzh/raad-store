"use client";

export function Radio({ checked, onChange }: RadioProps) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      aria-pressed={checked}
      className={`box-border flex h-[19px] w-[19px] cursor-pointer items-center justify-center rounded-full border-[1.6px] transition-all ${
        checked ? "border-primary" : "border-gray-300"
      }`}
    >
      <div
        className={`h-[11px] w-[11px] rounded-full transition-all duration-200 ${
          checked ? "bg-primary scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
    </button>
  );
}