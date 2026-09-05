// import { prisma } from "@/prisma/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const commentId = parseInt(id, 10);

//     if (isNaN(commentId)) {
//       return NextResponse.json(
//         { error: "شناسه کامنت معتبر نیست" },
//         { status: 400 },
//       );
//     }

//     // دریافت کامنت همراه با محصول
//     const comment = await prisma.comments.findUnique({
//       where: { id: commentId },
//       include: {
//         users: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//         products: {
//           // ← اطلاعات محصول را هم بگیر
//           select: {
//             id: true,
//             slug: true,
//             name: true,
//             description: true,
//             images: true,
//             // هر فیلد دیگری که نیاز دارید
//           },
//         },
//       },
//     });

//     if (!comment) {
//       return NextResponse.json({ error: "کامنت یافت نشد" }, { status: 404 });
//     }

//     // خروجی: کامنت + محصول
//     return NextResponse.json({
//       comment,
//       product: comment.products, // محصول مرتبط
//     });
//   } catch (error) {
//     console.error("Error fetching comment detail:", error);
//     return NextResponse.json(
//       { error: "خطا در دریافت اطلاعات" },
//       { status: 500 },
//     );
//   }
// }
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const commentId = parseInt(id, 10);

    if (isNaN(commentId)) {
      return NextResponse.json(
        { error: "شناسه کامنت معتبر نیست" },
        { status: 400 },
      );
    }

    // دریافت کامنت همراه با محصول (فقط id و slug)
    const comment = await prisma.comments.findUnique({
      where: { id: commentId },
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
            slug: true, // ✅ فقط id و slug
          },
        },
      },
    });

    if (!comment) {
      return NextResponse.json({ error: "کامنت یافت نشد" }, { status: 404 });
    }

    // خروجی: کامنت + محصول (فقط id و slug)
    return NextResponse.json({
      comment,
      product: comment.products,
    });
  } catch (error) {
    console.error("Error fetching comment detail:", error);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات" },
      { status: 500 },
    );
  }
}
