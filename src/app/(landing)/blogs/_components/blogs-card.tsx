"use client";

import Image from "next/image";
import Link from "next/link";

import { Blogs } from "@/src/app/(landing)/blogs/_types/blogs";
import {
  ClockIcon,
  SaveEmptyIcon,
  SaveFilledIcon,
  UserProfileIcon,
} from "@/src/shared/constants/icons";
import { IconLabelButton, Subtitle, Text } from "@/src/shared/ui";
import { ShareButton } from "@/src/shared/ui/share-button/share-button";

type BlogCardProps = {
  blog: Blogs;
  isLast?: boolean;
  onToggleSave?: (slug: string) => void;
};

export function BlogsCard({
  blog,
  isLast = false,
  onToggleSave,
}: BlogCardProps) {
  const handleSaveClick = () => {
    if (onToggleSave) {
      onToggleSave(blog.slug);
    }
  };

  return (
    <div
      className={`flex flex-col py-6 sm:py-8 ${!isLast ? "border-b border-gray" : ""}`}
    >
      {/* ==================== موبایل ==================== */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex flex-row gap-3">
          {/* عکس: سمت راست */}
          <div className="h-30 w-30 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={blog.image}
              alt={blog.title}
              width={120}
              height={120}
              className="h-full w-full object-cover"
            />
          </div>

          {/* محتوا: سمت چپ - بالا تایتل+آیکون‌ها، پایین نویسنده+زمان */}
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0 flex-1">
                <p className="text-bold text-lg text-secondary">{blog.title}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <ShareButton />
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="cursor-pointer hover:opacity-70"
                >
                  {blog.saved ? (
                    <SaveFilledIcon size="sm" color="text-secondary" />
                  ) : (
                    <SaveEmptyIcon size="sm" color="text-secondary" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <UserProfileIcon size="sm" />
                <Text size="sm" weight="regular" text={blog.author} />
              </div>
              <div className="flex items-center gap-1.5">
                <ClockIcon color="text-primary" size="sm" />
                <Text
                  size="sm"
                  weight="regular"
                  text={`${blog.readTime} دقیقه`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* سامری */}
        <div className="line-clamp-3">
          <Text text={blog.summary} size="md" weight="medium" />
        </div>

        {/* مطالعه بیشتر */}
        <div className="flex justify-start">
          <Link href={`/blogs/${blog.slug}`}>
            <IconLabelButton
              label="مطالعه‌ی بیشتر"
              showBorder={false}
              iconPosition="right"
              iconType="dropleft"
              textSize="md"
              textWeight="regular"
            />
          </Link>
        </div>
      </div>

      {/* ==================== تبلت و دسکتاپ (بدون تغییر) ==================== */}
      <div className="hidden sm:flex sm:flex-col sm:gap-8">
        <div className="flex items-center justify-between">
          <Subtitle
            text={blog.title}
            color="secondary"
            size="xl"
            weight="bold"
          />

          <div className="flex items-center justify-center gap-3">
            <ShareButton />

            <button
              type="button"
              onClick={handleSaveClick}
              className="cursor-pointer hover:opacity-70"
            >
              {blog.saved ? (
                <SaveFilledIcon size="md" color="text-secondary" />
              ) : (
                <SaveEmptyIcon size="md" color="text-secondary" />
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="w-[219px] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={blog.image}
              alt={blog.title}
              width={219}
              height={208}
              className="aspect-[219/208] h-auto w-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between gap-8">
            <div className="line-clamp-4">
              <Text text={blog.summary} size="lg" weight="medium" />
            </div>
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <UserProfileIcon size="md" />
                  <Text size="md" weight="regular" text={blog.author} />
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon color="text-primary" size="md" />
                  <Text
                    size="md"
                    weight="regular"
                    text={` ${blog.readTime} دقیقه`}
                  />
                </div>
              </div>

              <Link href={`/blogs/${blog.slug}`}>
                <IconLabelButton
                  label="مطالعه‌ی بیشتر"
                  showBorder={false}
                  iconPosition="right"
                  iconType="dropleft"
                  textSize="md"
                  textWeight="regular"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
