// GET /protected/brands
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
    const sort = searchParams.get("sort");

    const skip = (page - 1) * limit;

    const orderBy =
      sort === "name"
        ? { name: "asc" as const }
        : sort === "newest"
          ? { created_at: "desc" as const }
          : sort === "oldest"
            ? { created_at: "asc" as const }
            : { id: "asc" as const }; // پیش‌فرض همون قبلی

    const total = await prisma.brands.count();

    const brands = await prisma.brands.findMany({
      orderBy,
      skip,
      take: limit,
    });

    const hasMore = skip + brands.length < total;

    return NextResponse.json({
      data: brands,
      meta: { total, page, limit, hasMore },
    });
  },
  [2],
);

// ... POST همون قبلی، بدون تغییر
export const POST = withAuth(
  async (req) => {
    let imageUrl = "";

    try {
      const formData = await req.formData();

      const name = formData.get("name") as string;
      const slug = formData.get("slug") as string;
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
      const exist = await prisma.brands.findUnique({
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
          folder: "raad-store/brands",
        });
      }

      // -------------------------
      // create brand
      // -------------------------
      const brand = await prisma.brands.create({
        data: {
          name,
          slug,
          image: imageUrl, // ✅ اصلاح شد
        },
      });

      return NextResponse.json(brand, { status: 201 });
    } catch (error) {
      console.error(error);

      // rollback image
      if (imageUrl) {
        await deleteImage(imageUrl);
      }

      return NextResponse.json(
        { message: "خطا در ایجاد برند" },
        { status: 500 },
      );
    }
  },
  [2],
);
