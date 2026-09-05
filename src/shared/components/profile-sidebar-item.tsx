import { BadgeNumber, Text } from "@/src/shared/ui";

export function ProfileSidebarItem({ icon: Icon, label, count }: any) {
  return (
    <div className="hover:bg-light-gray flex cursor-pointer items-center justify-between border-t border-gray px-6 py-4 transition">
      <div className="flex items-center gap-3">
        <Icon size="md" />
        <Text size="sm" weight="medium" text={label} color="primary" />
      </div>

      {count > 0 && <BadgeNumber value={count} size="sm" variant="circle" />}
    </div>
  );
}
