// ui/action-button.ui.tsx
"use client";

import { Caption } from "@/src/shared/ui";
import { ActionButtonProps } from "./action-button.types";
import { useActionButton } from "./useActionButton";

// Reusable action button component
export default function ActionButton({
  label,
  icon,
  action,
  className = "",
}: ActionButtonProps) {
  const { handleAction } = useActionButton(action);

  return (
    <button
      onClick={handleAction}
      className={`flex h-[3.5vw] w-[3.7vw] cursor-pointer flex-col items-center justify-center rounded-sm border border-secondary bg-white shadow-sm transition-all duration-200 hover:active:scale-[0.97] ${className}`}
    >
      {/* Button icon */}
      {icon && <div className="mb-1.5 text-3xl text-secondary">{icon}</div>}

      {/* Button label */}
      <Caption text={label} size="xs" weight="medium" color="secondary" />
    </button>
  );
}
