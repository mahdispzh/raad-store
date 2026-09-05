import { Text } from "@/src/shared/ui";

import { ClockIcon, UserProfileIcon } from "@/src/shared/constants/icons";

type BlogMetaProps = {
  author: string;
  readTime: string;
};

export function BlogMeta({ author, readTime }: BlogMetaProps) {
  return (
    <div className="flex w-full flex-row items-start justify-start gap-6 min-[830px]:absolute min-[830px]:top-0 min-[830px]:right-0 min-[830px]:w-auto min-[830px]:flex-col min-[830px]:gap-2">
      <div className="flex items-center gap-2">
        <UserProfileIcon size={"md"} />

        <Text size="md" weight="regular" text={author} />
      </div>

      <div className="flex items-center gap-2">
        <ClockIcon color="text-primary" size={"md"} />

        <Text size="md" weight="regular" text={readTime} />
      </div>
    </div>
  );
}
