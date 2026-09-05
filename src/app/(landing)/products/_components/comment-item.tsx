// نمایش هر دیدگاه با نام کاربر، تاریخ، متن و امتیاز ستاره‌ای.

import { Caption, Text } from "@/src/shared/ui";
import { StarRating } from "@/src/shared/ui/star-rating/star-rating.ui";
import { CommentItemProps } from "../_types/landing-product.types";
// اضافه کردن تایپ

export function CommentItem({ user, date, text, rate }: CommentItemProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Text size="lg" weight="medium" text={user} />
        <Caption size="xs" weight="medium" text={date} />
      </div>
      <StarRating value={rate} size="sm" />

      <Text text={text} size="md" weight="regular" />
    </div>
  );
}
