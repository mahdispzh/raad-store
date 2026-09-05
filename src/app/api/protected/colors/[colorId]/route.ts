// import { prisma } from "@/prisma/prisma";
// import { withAuth } from "@/src/shared/auth/with-auth";
// import { NextRequest, NextResponse } from "next/server";

// type Params = {
//   params: Promise<{
//     colorId: string;
//   }>;
// };

// export const GET = withAuth(
//   async (req, user, context?: Params) => {
//     const { colorId } = await context!.params;

//     const color = await prisma.colors.findUnique({
//       where: {
//         id: Number(colorId),
//       },
//     });

//     return NextResponse.json(color);
//   },
//   [2],
// );

// export const PUT = withAuth(
//   async (req: NextRequest, user, context?: Params) => {
//     const { colorId } = await context!.params;

//     const body = await req.json();

//     const color = await prisma.colors.update({
//       where: {
//         id: Number(colorId),
//       },

//       data: {
//         name: body.name,
//         hex_code: body.hexCode,
//       },
//     });

//     return NextResponse.json(color);
//   },
//   [2],
// );

import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getColorIdFromUrl(req: NextRequest): number | null {
  const idStr = new URL(req.url).pathname.split("/").pop();
  const id = Number(idStr);
  return Number.isNaN(id) ? null : id;
}

export const GET = withAuth(
  async (req: NextRequest) => {
    const id = getColorIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    const color = await prisma.colors.findUnique({ where: { id } });

    if (!color) {
      return NextResponse.json({ message: "رنگ پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(color);
  },
  [2],
);

export const PUT = withAuth(
  async (req: NextRequest) => {
    const id = getColorIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    try {
      const body = await req.json();

      const color = await prisma.colors.update({
        where: { id },
        data: {
          name: body.name,
          hex_code: body.hexCode,
        },
      });

      return NextResponse.json(color);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "خطا در آپدیت رنگ" },
        { status: 500 },
      );
    }
  },
  [2],
);

export const DELETE = withAuth(
  async (req: NextRequest) => {
    const id = getColorIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    try {
      const color = await prisma.colors.findUnique({ where: { id } });

      if (!color) {
        return NextResponse.json({ message: "رنگ پیدا نشد" }, { status: 404 });
      }

      await prisma.colors.delete({ where: { id } });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "خطا در حذف رنگ" }, { status: 500 });
    }
  },
  [2],
);
