import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { deleteImage } from "@/src/shared/services/delete-image";
import { uploadImage } from "@/src/shared/services/upload-image";

import { NextResponse } from "next/server";

export const PUT = withAuth(
  async (req, user, { params }: { params: Promise<{ slug: string }> }) => {
    let newImageUrl: string | null = null;

    try {
      const { slug } = await params;

      const formData = await req.formData();

      const blog = await prisma.blogs.findUnique({
        where: {
          slug: slug,
        },
      });

      if (!blog) {
        return NextResponse.json(
          {
            message: "Blog not found",
          },
          {
            status: 404,
          },
        );
      }

      const imageFile = formData.get("image") as File | null;

      if (imageFile && imageFile.size > 0) {
        newImageUrl = await uploadImage({
          file: imageFile,
          folder: "untitled-store/blog",
        });
      }

      // const keywords = (formData.get("keywords") as string)
      //   ?.split(",")
      //   .map((x) => x.trim())
      //   .filter(Boolean);

      // const tags = (formData.get("tags") as string)
      //   ?.split(",")
      //   .map((x) => x.trim())
      //   .filter(Boolean);
      const parseJsonArray = (value: FormDataEntryValue | null): string[] => {
        if (!value || typeof value !== "string") return [];
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed)
            ? parsed.map((x) => String(x).trim()).filter(Boolean)
            : [];
        } catch {
          return [];
        }
      };

      const keywords = parseJsonArray(formData.get("keywords"));
      const tags = parseJsonArray(formData.get("tags"));

      const updatedBlog = await prisma.blogs.update({
        where: {
          slug: slug,
        },
        data: {
          title: (formData.get("title") as string) || blog.title,
          slug: (formData.get("slug") as string) || blog.slug,
          summary: (formData.get("summary") as string) || blog.summary,
          content: (formData.get("content") as string) || blog.content,
          author: (formData.get("author") as string) || blog.author,
          status: Number(formData.get("status") ?? blog.status),
          publish_at: formData.get("publish_at")
            ? new Date(formData.get("publish_at") as string)
            : blog.publish_at,
          rading_time:
            (formData.get("rading_time") as string) ?? blog.rading_time,
          keywords: keywords?.length ? keywords : blog.keywords,
          tags: tags?.length ? tags : blog.tags,
          image: newImageUrl ?? blog.image,
          updated_at: new Date(),
        },
      });

      // بعد از موفقیت آپدیت، عکس قبلی حذف شود
      if (newImageUrl && blog.image) {
        await deleteImage(blog.image);
      }

      return NextResponse.json(updatedBlog);
    } catch (error) {
      console.error(error);

      // اگر عکس جدید آپلود شده ولی آپدیت دیتابیس شکست خورده
      if (newImageUrl) {
        await deleteImage(newImageUrl);
      }

      return NextResponse.json(
        {
          message: "خطا در ویرایش بلاگ",
        },
        {
          status: 500,
        },
      );
    }
  },
  [2],
);

export const DELETE = withAuth(
  async (req, user, { params }: { params: Promise<{ slug: string }> }) => {
    try {
      const { slug } = await params;

      const blog = await prisma.blogs.findUnique({
        where: {
          slug: slug,
        },
      });

      if (!blog) {
        return NextResponse.json(
          {
            message: "Blog not found",
          },
          {
            status: 404,
          },
        );
      }

      // حذف عکس از پارس‌پک
      if (blog.image) {
        await deleteImage(blog.image);
      }

      // حذف بلاگ
      await prisma.blogs.delete({
        where: {
          slug: slug,
        },
      });

      return NextResponse.json({
        success: true,
      });
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          message: "خطا در حذف بلاگ",
        },
        {
          status: 500,
        },
      );
    }
  },
  [2],
);
