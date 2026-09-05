import { ChartIcon, DateIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";

type BlogActionsProps = {
  views: number;
  createdAt: string;
};

export function BlogActions({ views, createdAt }: BlogActionsProps) {
  return (
    <div className="flex justify-between px-6">
      <div className="flex items-center gap-2">
        <ChartIcon size={"md"} color="text-primary" />

        <Text size="md" text={`${views} نفر`} weight="regular" />
      </div>

      <div className="flex items-center gap-2">
        <DateIcon size={"md"} color="text-primary" />

        <Text size="md" text={createdAt} weight="regular" />
      </div>
    </div>
  );
}
