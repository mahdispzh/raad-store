import Link from "next/link";

import { Caption, Text } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/check-box/checkbox.ui";

import { CommentsCardAction } from "@/src/app/dashboard/comments/_components/comments-card/comments-card-action";
import { CommentsCardImage } from "@/src/app/dashboard/comments/_components/comments-card/comments-card-image";
import { CommentsCardMeta } from "@/src/app/dashboard/comments/_components/comments-card/comments-card-meta";
import type { CommentsItem } from "@/src/app/dashboard/comments/_types/comments.types";
import { RatingStars } from "@/src/shared/utils/rating-stars";

interface Props {
  comment: CommentsItem;
  isLast: boolean;
}

export function CommentsCard({ comment, isLast }: Props) {
  return (
    <div
      dir={"rtl"}
      className={`flex items-center justify-between border-gray py-6 ${
        !isLast ? "border-b" : ""
      }`}
    >
      <div className={"gap-layout flex w-full"}>
        <Checkbox />

        <CommentsCardImage
          src={comment.productImage}
          alt={comment.productName}
        />

        <div className={"gap-layout flex w-[65%] flex-col pt-4"}>
          <div className={"gap-layout flex"}>
            <Link href={`/dashboard/profile/comments/${comment.id}`}>
              <Text text={comment.productName} size={"md"} />
            </Link>

            <RatingStars rating={comment.rating} />
          </div>

          <Caption size={"xs"} weight={"regular"} text={comment.description} />

          <CommentsCardMeta
            storeName={comment.storeName}
            size={comment.size}
            color={comment.color}
            date={comment.date}
          />
        </div>
      </div>

      <CommentsCardAction />
    </div>
  );
}
