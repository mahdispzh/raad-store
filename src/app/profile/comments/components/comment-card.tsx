import { Caption, StatusBadge, Text } from "@/src/shared/ui";
import { RatingStars } from "@/src/shared/utils/rating-stars";
import Image from "next/image";
import Link from "next/link";
import { COMMENT_STATUS_MAP } from "../constants/comment-status.constants";
import { toJalaliDate } from "../_utils/date.utils";
import { CalendarIcon, StoreIcon } from "@/src/shared/constants/icons";
import storeinformation from "../../../../shared/constants/texts/store-information.json";

type CommentCardProps = {
  productName: string;
  productImage: string;
  productSlug: string;
  comment: string;
  date: string;
  status: number;
  rating: number;
};

export function CommentCard({
  productName,
  productImage,
  productSlug,
  comment,
  date,
  status,
  rating,
}: CommentCardProps) {
  const badge = COMMENT_STATUS_MAP[status];

  return (
    <div className="flex w-full items-stretch justify-between gap-4 border-b border-gray py-6">
      {/* بخش سمت چپ: تصویر و اطلاعات محصول */}
      <div className="flex w-[75%] items-stretch gap-4">
        {/* تصویر محصول */}
        <Link href={`/products/${productSlug}`}>
          <Image
            src={productImage}
            alt={productName}
            width={300}
            height={225}
            className="h-[110px] w-[80px] cursor-pointer rounded-sm object-cover transition-transform hover:scale-105"
          />
        </Link>

        {/* اطلاعات محصول */}
        <div className="flex h-full flex-1 flex-col justify-between">
          {/* بخش بالایی: نام محصول، امتیاز و کامنت */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-10">
                      <Link href={`/products/${productSlug}`}>

              <Text text={productName} size="md" weight="medium" />
              </Link>
              <RatingStars rating={rating} size="sm" />
            </div>

            <Text size="sm" weight="regular" text={comment} />
          </div>

          {/* بخش پایینی: فروشنده و تاریخ */}
          <div className="flex gap-5">
            <div className="flex items-center gap-1">
              <StoreIcon size="sm" color="primary" />
              <Caption
                size="xs"
                weight="regular"
                color="primary"
                text={storeinformation.storename}
              />
            </div>

            <div className="flex items-center gap-1">
              <CalendarIcon size="sm" color="primary" />
              <Caption
                size="xs"
                weight="regular"
                color="primary"
                text={toJalaliDate(date)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* بخش سمت راست: وضعیت */}
      <div className="flex items-center">
        {badge && <StatusBadge text={badge.text} color={badge.color} />}
      </div>
    </div>
  );
}