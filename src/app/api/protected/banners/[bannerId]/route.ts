import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { deleteImage } from "@/src/shared/services/delete-image";
import { uploadImage } from "@/src/shared/services/upload-image";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ bannerId: string }>;
};

// =======================
// GET SINGLE BANNER
// =======================
export const GET = withAuth(
  async (_req, _user, ctx: Params) => {
    const { bannerId } = await ctx.params;

    const banner = await prisma.banners.findUnique({
      where: { id: Number(bannerId) },
    });

    return NextResponse.json(banner);
  },
  [2],
);

// =======================
// UPDATE BANNER (with optional image replace)
// =======================
export const PUT = withAuth(
  async (req, _user, ctx: Params) => {
    const { bannerId } = await ctx.params;

    const existing = await prisma.banners.findUnique({
      where: { id: Number(bannerId) },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 },
      );
    }

    let newImageUrl = existing.image;

    const formData = await req.formData();

    const imageFile = formData.get("image") as File | null;
    const alt = formData.get("alt") as string;
    const sort_order = formData.get("sort_order")
      ? Number(formData.get("sort_order"))
      : null;
    const isActive =
      formData.get("isActive") === "true"
        ? true
        : formData.get("isActive") === "false"
          ? false
          : null;

    // replace image
    if (imageFile && imageFile.size > 0) {
      newImageUrl = await uploadImage({
        file: imageFile,
        folder: "raad-store/banners",
      });

      await deleteImage(existing.image);
    }

    const updated = await prisma.banners.update({
      where: { id: Number(bannerId) },
      data: {
        image: newImageUrl,
        alt,
        sort_order,
  is_active: isActive,
      },
    });

    return NextResponse.json(updated);
  },
  [2],
);

// =======================
// DELETE BANNER
// =======================
export const DELETE = withAuth(
  async (_req, _user, ctx: Params) => {
    const { bannerId } = await ctx.params;

    const banner = await prisma.banners.findUnique({
      where: { id: Number(bannerId) },
    });

    if (!banner) {
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 },
      );
    }

    await deleteImage(banner.image);

    await prisma.banners.delete({
      where: { id: Number(bannerId) },
    });

    return NextResponse.json({ success: true });
  },
  [2],
);
