import { withAuth } from "@/src/shared/auth/with-auth";
import { uploadImages } from "@/src/shared/services/upload-images";
import { NextResponse } from "next/server";

export const POST = withAuth(
  async (req) => {
    try {
      const formData = await req.formData();
      const file = formData.get("image") as File;

      if (!file) {
        return NextResponse.json({ error: "عکسی ارسال نشده" }, { status: 400 });
      }

      const [url] = await uploadImages({
        files: [file],
        folder: "untitled-store/editor",
      });

      return NextResponse.json({ url });
    } catch (error) {
      console.error("خطا در آپلود:", error);
      return NextResponse.json({ error: "آپلود ناموفق" }, { status: 500 });
    }
  },
  [2],
);
