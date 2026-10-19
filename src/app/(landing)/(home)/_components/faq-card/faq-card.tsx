import { ChevronDownIcon } from "@/src/shared/ui/icons/chevron-down-icon";
import type { FaqCardProps } from "./faq-card-types";

export default function FaqCard({
  question,
  answer,
  isOpen,
  onClick,
}: FaqCardProps) {
  return (
    <div
      className={`rounded-lg border ${
        isOpen ? "border-border bg-background" : "border-transparent bg-border"
      }`}
    >
      {/* question */}
      <button
        type="button"
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-sm text-foreground"
      >
        {question}
        <ChevronDownIcon
          className={`shrink-0 text-base ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* answer */}
      {isOpen && <p className="px-4 pb-4 text-xs text-grey">{answer}</p>}
    </div>
  );
}