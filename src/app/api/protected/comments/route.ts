// app/api/users/route.ts
import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const POST = withAuth(
  async (req, user) => {
    try {
      const body = await req.json();

      const { product_id, text, parent_id, isUnknown } = body;

      if (!product_id || !text?.trim()) {
        return NextResponse.json(
          {
            success: false,
            message: "product_id and text are required",
          },
          { status: 400 },
        );
      }

      const comment = await prisma.comments.create({
        data: {
          product_id: Number(product_id),
          parent_id: parent_id ? Number(parent_id) : null,
          text: text.trim(),
          user_id: user.userId,
          isUnknown: isUnknown ?? false,
          status: 0,
          created_at: new Date(),
        },
        include: {
          users: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return NextResponse.json(
        {
          success: true,
          data: comment,
        },
        { status: 201 },
      );
    } catch (error) {
      console.error("Create comment error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  },
  [1, 2],
);

export const GET = withAuth(
  async (req) => {
    try {
      const { searchParams } = new URL(req.url);

      const page = Number(searchParams.get("page") || 1);
      const limit = Number(searchParams.get("limit") || 10);
      const status = searchParams.get("status");

      const where = {
        ...(status !== null && { status: Number(status) }),
      };

      const [comments, total] = await Promise.all([
        prisma.comments.findMany({
          where,
          include: {
            users: {
              select: {
                id: true,
                name: true,
              },
            },
            products: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: true,
                ratings: {
                  select: {
                    rating: true,
                  },
                },
              },
            },
          },
          orderBy: {
            created_at: "desc",
          },
          skip: (page - 1) * limit,
          take: limit,
        }),

        prisma.comments.count({
          where,
        }),
      ]);

      return NextResponse.json({
        success: true,
        data: comments,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  },
  [2],
);
export const PUT = withAuth(
  async (req) => {
    try {
      const body = await req.json();

      const { commentId, status } = body;

      if (!commentId) {
        return NextResponse.json(
          {
            success: false,
            message: "commentId is required",
          },
          { status: 400 },
        );
      }

      if (![0, 1, 2].includes(Number(status))) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid status",
          },
          { status: 400 },
        );
      }

      const comment = await prisma.comments.update({
        where: {
          id: Number(commentId),
        },
        data: {
          status: Number(status),
        },
      });

      return NextResponse.json({
        success: true,
        data: comment,
      });
    } catch (error) {
      console.error("Update comment status error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  },
  [2],
);
