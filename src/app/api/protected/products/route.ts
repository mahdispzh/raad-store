/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { deleteImages } from "@/src/shared/services/delete-images";
import { uploadImages } from "@/src/shared/services/upload-images";
import { NextResponse } from "next/server";
// LIST
export const GET = withAuth(
  async (req) => {
    const searchParams = new URL(req.url).searchParams;

    const search = searchParams.get("search");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const sort = searchParams.get("sort");
    const discount = searchParams.get("discount");

    const skip = (page - 1) * limit;

    let orderBy: any = { created_at: { sort: "desc", nulls: "last" } };

    // sorting
    if (sort === "newest") {
      orderBy = { created_at: "desc" };
    }

    if (sort === "popular") {
      orderBy = { sold_count: "desc" };
    }

    if (sort === "views") {
      orderBy = { views: "desc" };
    }

    if (sort === "likes") {
      orderBy = { likes: "desc" };
    }

    const where: any = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }
    // discount filter
    if (discount === "true") {
      where.discount = {
        gt: 0,
      };
    }

    const total = await prisma.products.count({ where });

    const products = await prisma.products.findMany({
      where,
      skip,
      take: limit,
      orderBy,

      include: {
        brands: true,
        categories: true,
        product_variants: {
          include: {
            colors: true,
            sizes: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: products,
      meta: {
        total,
        page,
        limit,
        hasMore: skip + products.length < total,
      },
    });
  },
  [2],
);

export const POST = withAuth(
  async (req) => {
    let uploadedImages: string[] = [];

    try {
      const formData = await req.formData();

      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const category_id = Number(formData.get("category_id"));
      const brand_id = Number(formData.get("brand_id"));
      const slug = formData.get("slug") as string;
      const status = Number(formData.get("status"));

      const discountRaw = formData.get("discount");
      const discount =
        discountRaw !== null && discountRaw !== "" ? Number(discountRaw) : null;

      const variants = JSON.parse(formData.get("product_variants") as string);

      const featuresRaw = formData.get("features");
      const features = featuresRaw ? JSON.parse(featuresRaw as string) : [];

      const imageFiles = formData.getAll("images") as File[];

      if (imageFiles.length === 0) {
        return NextResponse.json(
          {
            message: "حداقل یک عکس لازم است",
          },
          {
            status: 400,
          },
        );
      }

      const exist = await prisma.products.findUnique({
        where: {
          slug,
        },
      });

      if (exist) {
        return NextResponse.json(
          {
            message: "Slug already exists",
          },
          {
            status: 409,
          },
        );
      }

      // -------------------------
      // Upload Images
      // -------------------------

      uploadedImages = await uploadImages({
        files: imageFiles,
        folder: "raad-store/product",
      });

      // -------------------------
      // Create Product
      // -------------------------

      const product = await prisma.products.create({
        data: {
          name,
          description,
          category_id,
          brand_id,
          slug,
          status,
          discount,

          images: uploadedImages,

          product_variants: {
            create: variants.map((variant: any) => ({
              color_id: variant.color_id,
              size_id: variant.size_id,
              price: Number(variant.price),
              stock: Number(variant.stock),
              sku: variant.sku,
            })),
          },

          features: {
            create: features.map((f: { name: string; value: string }) => ({
              name: f.name,
              value: f.value,
            })),
          },
        },

        include: {
          brands: true,
          categories: true,
          product_variants: {
            include: {
              colors: true,
              sizes: true,
            },
          },
          features: true, // ⬅️ جدید
        },
      });

      return NextResponse.json(product, {
        status: 201,
      });
    } catch (error) {
      console.error(error);

      // Rollback Images
      if (uploadedImages.length) {
        await deleteImages(uploadedImages);
      }

      return NextResponse.json(
        {
          message: "خطا در ثبت محصول",
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
  async (req) => {
    try {
      const { id } = await req.json();

      const product = await prisma.products.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!product) {
        return NextResponse.json(
          {
            message: "محصول پیدا نشد",
          },
          {
            status: 404,
          },
        );
      }

      // -------------------------
      // Soft Delete
      // غیرفعال کردن تمام Variant های محصول
      // -------------------------

      await prisma.product_variants.updateMany({
        where: {
          product_id: product.id,
        },
        data: {
          is_active: false,
        },
      });

      return NextResponse.json({
        success: true,
        message: "محصول غیرفعال شد.",
      });
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          message: "خطا در غیرفعال کردن محصول",
        },
        {
          status: 500,
        },
      );
    }
  },
  [2],
);
