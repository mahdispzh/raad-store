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

    const skip = (page - 1) * limit;

    const total = await prisma.categories.count();

    const categories = await prisma.categories.findMany({
      orderBy: {
        created_at: "desc",
      },
      skip,
      take: limit,
    });

    const hasMore = skip + categories.length < total;

    return NextResponse.json({
      data: categories,
      meta: {
        total,
        page,
        limit,
        hasMore,
      },
    });
  },
  [2],
);

export const POST = withAuth(
  async (req) => {
    let imageUrl = "";

    try {
      const formData = await req.formData();

      const name = formData.get("name") as string;
      const slug = name.trim().toLowerCase().replace(/\s+/g, "-");
      const description = formData.get("description") as string;
      const parentId = formData.get("parentId") as string | null;
      const imageFile = formData.get("image") as File | null;

      // -------------------------
      // validation
      // -------------------------
      if (!name || !slug) {
        return NextResponse.json(
          { message: "name و slug الزامی هستند" },
          { status: 400 },
        );
      }

      // -------------------------
      // duplicate slug check
      // -------------------------
      const exist = await prisma.categories.findUnique({
        where: { slug },
      });

      if (exist) {
        return NextResponse.json(
          { message: "این slug قبلاً استفاده شده است" },
          { status: 409 },
        );
      }

      // -------------------------
      // upload image
      // -------------------------
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage({
          file: imageFile,
          folder: "raad-store/categories",
        });
      }

      // -------------------------
      // create category
      // -------------------------
      const category = await prisma.categories.create({
        data: {
          name,
          slug,
          description,
          image: imageUrl,
          parent_id: parentId ? Number(parentId) : null,
        },
      });

      return NextResponse.json(category, { status: 201 });
    } catch (error) {
      console.error(error);

      if (imageUrl) {
        await deleteImage(imageUrl);
      }

      return NextResponse.json(
        { message: "خطا در ایجاد دسته‌بندی" },
        { status: 500 },
      );
    }
  },
  [2],
);
