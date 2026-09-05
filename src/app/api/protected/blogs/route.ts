// GET /protected/blogs (route.ts)
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { deleteImage } from "@/src/shared/services/delete-image";
import { uploadImage } from "@/src/shared/services/upload-image";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status !== null && status !== "" && status !== "all") {
      where.status = Number(status);
    }

    const total = await prisma.blogs.count({ where });

    const blogs = await prisma.blogs.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: {
        _count: { select: { liked_blogs: true, saved_blogs: true } },
      },
    });

    const hasMore = skip + blogs.length < total;

    return NextResponse.json({
      data: blogs,
      meta: { total, page, limit, hasMore },
    });
  },
  [2],
);

export const POST = withAuth(
  async (req, user) => {
    let imageUrl = "";
    try {
      const formData = await req.formData();
      const title = formData.get("title") as string;
      const slug = formData.get("slug") as string;
      const summary = formData.get("summary") as string;
      const content = formData.get("content") as string;
      const keywords = JSON.parse(formData.get("keywords") as string);
      const tags = JSON.parse(formData.get("tags") as string);
      const rading_time = formData.get("rading_time") as string;
      const status = Number(formData.get("status"));
      const publish_at = formData.get("publish_at") as string;
      const imageFile = formData.get("image") as File | null;

      // ✅ تغییر ۱: خواندن author از FormData
      const authorFromForm = formData.get("author") as string;

      // ✅ تغییر ۲: تعیین مقدار نهایی author (اولویت با مقدار ارسالی، در غیر این صورت user.name)
      const author = authorFromForm?.trim() || user.name;

      if (!title || !slug || !content) {
        return NextResponse.json(
          {
            message: "Title, slug and content are required.",
          },
          {
            status: 400,
          },
        );
      }

      const exist = await prisma.blogs.findUnique({
        where: {
          slug,
        },
      });

      if (exist) {
        return NextResponse.json(
          {
            message: "Slug already exists.",
          },
          {
            status: 409,
          },
        );
      }

      // Upload Image
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage({
          file: imageFile,
          folder: "untitled-store/blog",
        });
      }

      const blog = await prisma.blogs.create({
        data: {
          title,
          slug,
          summary,
          content,
          image: imageUrl,
          status,
          keywords,
          tags,
          publish_at: publish_at ? new Date(publish_at) : null,
          rading_time,
          user_id: user.userId,
          // ✅ تغییر ۳: استفاده از متغیر author به جای user.name
          author: author,
          created_at: new Date(),
          updated_at: new Date(),
          likes: 0,
          view: 0,
          comments: 0,
        },
      });

      return NextResponse.json(blog, {
        status: 201,
      });
    } catch (error) {
      console.error(error);

      if (imageUrl) {
        await deleteImage(imageUrl);
      }

      return NextResponse.json(
        {
          message: "خطا در ایجاد بلاگ",
        },
        {
          status: 500,
        },
      );
    }
  },
  [2],
);
