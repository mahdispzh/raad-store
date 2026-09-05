import { Caption } from "@/src/shared/ui";

import { RulerIcon } from "@/src/shared/constants/icons/ruler-icon";
import { StoreIcon } from "@/src/shared/constants/icons/store-icon";

import { Dot } from "@/src/shared/ui/dot/dot.ui";

interface Props {
  storeName: string;
  size: string;
  color: string;
  date: string;
}

export function CommentsCardMeta({ storeName, size, color, date }: Props) {
  return (
    <div className={"gap-layout flex items-center"}>
      <div className={"flex items-center gap-1"}>
        <StoreIcon size={"md"} />
        <Caption text={storeName} size={"xs"} />
      </div>

      <div className={"flex gap-2"}>
        <div className={"flex items-center gap-1"}>
          <RulerIcon size={"md"} />
          <Caption text={size} size={"xs"} />
        </div>

        <div className={"flex items-center gap-1"}>
          <Dot size={"lg"} />
          <Caption text={color} size={"xs"} />
        </div>
      </div>

      <Caption text={date} size={"xs"} />
    </div>
  );
}
