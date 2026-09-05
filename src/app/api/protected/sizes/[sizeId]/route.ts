// import { prisma } from "@/prisma/prisma";
// import { withAuth } from "@/src/shared/auth/with-auth";
// import { NextResponse } from "next/server";

// type Params = {
//   params: Promise<{
//     sizeId: string;
//   }>;
// };

// export const GET = withAuth(
//   async (req, user, context?: Params) => {
//     const { sizeId } = await context!.params;

//     const size = await prisma.sizes.findUnique({
//       where: {
//         id: Number(sizeId),
//       },
//     });

//     return NextResponse.json(size);
//   },
//   [2],
// );

// export const PUT = withAuth(
//   async (req, user, context?: Params) => {
//     const { sizeId } = await context!.params;

//     const body = await req.json();

//     const size = await prisma.sizes.update({
//       where: {
//         id: Number(sizeId),
//       },

//       data: {
//         name: body.name,
//         sort_order: body.sortOrder,
//       },
//     });

//     return NextResponse.json(size);
//   },
//   [2],
// );

import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getSizeIdFromUrl(req: NextRequest): number | null {
  const idStr = new URL(req.url).pathname.split("/").pop();
  const id = Number(idStr);
  return Number.isNaN(id) ? null : id;
}

export const GET = withAuth(
  async (req: NextRequest) => {
    const id = getSizeIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    const size = await prisma.sizes.findUnique({ where: { id } });

    if (!size) {
      return NextResponse.json({ message: "سایز پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(size);
  },
  [2],
);

export const PUT = withAuth(
  async (req: NextRequest) => {
    const id = getSizeIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    try {
      const body = await req.json();

      const size = await prisma.sizes.update({
        where: { id },
        data: {
          name: body.name,
          sort_order: body.sortOrder,
        },
      });

      return NextResponse.json(size);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "خطا در آپدیت سایز" },
        { status: 500 },
      );
    }
  },
  [2],
);

export const DELETE = withAuth(
  async (req: NextRequest) => {
    const id = getSizeIdFromUrl(req);
    if (!id) {
      return NextResponse.json(
        { message: "شناسه نامعتبر است" },
        { status: 400 },
      );
    }

    try {
      const size = await prisma.sizes.findUnique({ where: { id } });

      if (!size) {
        return NextResponse.json({ message: "سایز پیدا نشد" }, { status: 404 });
      }

      await prisma.sizes.delete({ where: { id } });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "خطا در حذف سایز" }, { status: 500 });
    }
  },
  [2],
);
