// src/app/profile/orders/_components/ui/profile-tab.tsx
import { BadgeNumber, Text } from "@/src/shared/ui";
import { ProfileTabProps } from "../_types/order.types";

export function ProfileTab({ label, count, active, onClick }: ProfileTabProps) {
  return (
    <button
      onClick={onClick}
      className={`text-xs text-medium text-white flex cursor-pointer items-center gap-1 border-b-2 pb-2 transition ${active ? "border-danger" : "border-transparent"}`}
    >
      <Text text={label} size="md" weight="bold" />
      <BadgeNumber
        value={count}
        size="sm"
        variant="square"
        className={!active ? "bg-gray" : ""}
      />
    </button>
  );
}