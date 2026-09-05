import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { deleteImage } from "@/src/shared/services/delete-image";
import { uploadImage } from "@/src/shared/services/upload-image";
import { NextResponse } from "next/server";

// =======================
// LIST BANNERS
// =======================
export const GET = withAuth(async () => {
  const banners = await prisma.banners.findMany({
    orderBy: {
      sort_order: "asc",
    },
  });

  return NextResponse.json(banners);
}, [2]);

// =======================
// CREATE BANNER
// =======================
// export const POST = withAuth(
//   async (req) => {
//     let imageUrl = "";

//     try {
//       const formData = await req.formData();

//       const imageFile = formData.get("image") as File | null;
//       const alt = formData.get("alt") as string;
//       const sort_order = Number(formData.get("sort_order"));
//       const isActive =
//         formData.get("isActive") === "true"
//           ? true
//           : formData.get("isActive") === "false"
//             ? false
//             : null;

//       if (!imageFile) {
//         return NextResponse.json(
//           { message: "Image is required" },
//           { status: 400 },
//         );
//       }

//       // Upload image to ParsPack
//       imageUrl = await uploadImage({
//         file: imageFile,
//         folder: "untitled-store/banners",
//       });

//       const banner = await prisma.banners.create({
//         data: {
//           image: imageUrl,
//           alt,
//           sort_order,
//           is_active: isActive,
//         },
//       });

//       return NextResponse.json(banner, { status: 201 });
//     } catch (error) {
//       console.error(error);

//       if (imageUrl) {
//         await deleteImage(imageUrl);
//       }

//       return NextResponse.json(
//         { message: "Failed to create banner" },
//         { status: 500 },
//       );
//     }
//   },
//   [2],
// );

export const POST = withAuth(
  async (req) => {
    let newImageUrl = "";
    let oldImageUrl = "";

    try {
      const formData = await req.formData();

      const imageFile = formData.get("image") as File | null;
      const alt = formData.get("alt") as string;
      const sort_order = Number(formData.get("sort_order"));
      const isActive = true;

      if (!imageFile) {
        return NextResponse.json(
          { message: "Image is required" },
          { status: 400 },
        );
      }

      // ✅ 1. بررسی وجود بنر با sort_order درخواستی
      const existingBanner = await prisma.banners.findUnique({
        where: { sort_order },
        select: { image: true },
      });

      // اگر بنر قبلی وجود داشت، تصویر آن را ذخیره کن تا بعداً حذف شود
      if (existingBanner) {
        oldImageUrl = existingBanner.image;
      }

      // ✅ 2. آپلود تصویر جدید
      newImageUrl = await uploadImage({
        file: imageFile,
        folder: "untitled-store/banners",
      });

      // ✅ 3. Upsert بر اساس sort_order
      const banner = await prisma.banners.upsert({
        where: { sort_order },
        update: {
          image: newImageUrl,
          alt: alt || null,
          is_active: isActive,
        },
        create: {
          image: newImageUrl,
          alt: alt || null,
          sort_order,
          is_active: isActive,
        },
      });

      // ✅ 4. حذف تصویر قدیمی (اگر وجود داشت)
      if (oldImageUrl) {
        await deleteImage(oldImageUrl);
      }

      return NextResponse.json(banner, { status: 201 });
    } catch (error) {
      console.error(error);

      // در صورت خطا، تصویر جدید آپلود شده را حذف کن
      if (newImageUrl) {
        await deleteImage(newImageUrl);
      }

      return NextResponse.json(
        { message: "Failed to create/update banner" },
        { status: 500 },
      );
    }
  },
  [2],
);
