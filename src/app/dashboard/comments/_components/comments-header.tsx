import { CommentIcon } from "@/src/shared/constants/icons/comment-icon";
import { DualSquareEmpty } from "@/src/shared/constants/icons/dual-square-empty";
import { TrashIcon } from "@/src/shared/constants/icons/trash-icon";

import { Text } from "@/src/shared/ui";

export function CommentsHeader() {
  return (
    <div
      className={
        "flex items-end justify-between gap-2 border-b-2 border-gray py-3"
      }
    >
      <div className={"gap-layout flex items-end"}>
        <CommentIcon size={"lg"} color={"text-primary"} />

        <Text
          text={"کامنت‌ها"}
          size={"lg"}
          weight={"medium"}
          color={"primary"}
        />
      </div>

      <div className={"flex items-end gap-2"}>
        <TrashIcon size={"md"} />
        <DualSquareEmpty size={"md"} />
      </div>
    </div>
  );
}
