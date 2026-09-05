// import { prisma } from "@/prisma/prisma";
// import { withAuth } from "@/src/shared/auth/with-auth";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// type Params = {
//   params: Promise<{
//     brandId: string;
//   }>;
// };

// export const GET = withAuth(
//   async (req: NextRequest, _user, context?: Params) => {
//     const { brandId } = await context!.params;

//     const id = Number(brandId);

//     const brand = await prisma.brands.findUnique({
//       where: { id },
//     });

//     if (!brand) {
//       return NextResponse.json({ message: "برند پیدا نشد" }, { status: 404 });
//     }

//     return NextResponse.json(brand);
//   },
//   [2],
// );

// import { deleteImage } from "@/src/shared/services/delete-image";
// import { uploadImage } from "@/src/shared/services/upload-image";

// export const PUT = withAuth(
//   async (req: NextRequest, _user, context?: Params) => {
//     const { brandId } = await context!.params;

//     const id = Number(brandId);

//     const formData = await req.formData();

//     const name = formData.get("name") as string;
//     const slug = formData.get("slug") as string;
//     const imageFile = formData.get("image") as File | null;

//     const brand = await prisma.brands.findUnique({
//       where: { id },
//     });

//     if (!brand) {
//       return NextResponse.json({ message: "برند پیدا نشد" }, { status: 404 });
//     }

//     let imageUrl = brand.image;

//     try {
//       // -------------------------
//       // upload new image
//       // -------------------------
//       if (imageFile && imageFile.size > 0) {
//         const newImage = await uploadImage({
//           file: imageFile,
//           folder: "untitled-store/brands",
//         });

//         // delete old image
//         if (brand.image) {
//           await deleteImage(brand.image);
//         }

//         imageUrl = newImage;
//       }

//       // -------------------------
//       // update brand
//       // -------------------------
//       const updated = await prisma.brands.update({
//         where: { id },
//         data: {
//           name,
//           slug,
//           image: imageUrl,
//         },
//       });

//       return NextResponse.json(updated);
//     } catch (error) {
//       console.error(error);

//       return NextResponse.json(
//         { message: "خطا در آپدیت برند" },
//         { status: 500 },
//       );
//     }
//   },
//   [2],
// );

import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { deleteImage } from "@/src/shared/services/delete-image";
import { uploadImage } from "@/src/shared/services/upload-image";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getBrandIdFromUrl(req: NextRequest): number | null {
  const idStr = new URL(req.url).pathname.split("/").pop();
  const id = Number(idStr);
  return Number.isNaN(id) ? null : id;
}

export const GET = withAuth(
  async (req: NextRequest) => {
    const id = getBrandIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    const brand = await prisma.brands.findUnique({ where: { id } });

    if (!brand) {
      return NextResponse.json({ message: "برند پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(brand);
  },
  [2],
);

export const PUT = withAuth(
  async (req: NextRequest) => {
    const id = getBrandIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    const brand = await prisma.brands.findUnique({ where: { id } });

    if (!brand) {
      return NextResponse.json({ message: "برند پیدا نشد" }, { status: 404 });
    }

    try {
      const formData = await req.formData();

      const name = formData.get("name") as string;
      const slug = formData.get("slug") as string;
      const imageFile = formData.get("image") as File | null;

      let imageUrl = brand.image;

      if (imageFile && imageFile.size > 0) {
        const newImage = await uploadImage({
          file: imageFile,
          folder: "untitled-store/brands",
        });

        if (brand.image) {
          try {
            await deleteImage(brand.image);
          } catch (imgError) {
            console.error(
              "⚠️ خطا در حذف عکس قدیمی (نادیده گرفته شد):",
              imgError,
            );
          }
        }

        imageUrl = newImage;
      }

      const updated = await prisma.brands.update({
        where: { id },
        data: { name, slug, image: imageUrl },
      });

      return NextResponse.json(updated);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "خطا در آپدیت برند" },
        { status: 500 },
      );
    }
  },
  [2],
);

export const DELETE = withAuth(
  async (req: NextRequest) => {
    const id = getBrandIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    const brand = await prisma.brands.findUnique({ where: { id } });

    if (!brand) {
      return NextResponse.json({ message: "برند پیدا نشد" }, { status: 404 });
    }

    try {
      await prisma.brands.delete({ where: { id } });

      if (brand.image) {
        try {
          await deleteImage(brand.image);
        } catch (imgError) {
          console.error("⚠️ خطا در حذف عکس (نادیده گرفته شد):", imgError);
        }
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "خطا در حذف برند" }, { status: 500 });
    }
  },
  [2],
);
