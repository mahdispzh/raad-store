// /dashboard/colors/[id]/edit/page.tsx
"use client";

import { Text } from "@/src/shared/ui";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useColor, useUpdateColor } from "../../../_hooks/useColors";
import { hexToRgbString, hexToHslString } from "@/src/shared/utils/hex-color";

export default function EditColorPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data: color, isLoading } = useColor(id);
  const mutation = useUpdateColor();

  const [name, setName] = useState("");
  const [hexCode, setHexCode] = useState("#000000");
  const [errorMessage, setErrorMessage] = useState("");

  // وقتی دیتای رنگ از سرور رسید، فرم رو باهاش پر کن
  useEffect(() => {
    if (color) {
      setName(color.name);
      setHexCode(color.hex_code);
    }
  }, [color]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !hexCode.trim()) {
      setErrorMessage("لطفاً نام و کد رنگ را وارد کنید.");
      return;
    }

    setErrorMessage("");

    mutation.mutate(
      {
        id,
        data: {
          name: name.trim(),
          hexCode: hexCode.trim(),
        },
      },
      {
        onSuccess: () => {
          setErrorMessage("");
          alert("✅ رنگ با موفقیت ویرایش شد.");
          router.push("/dashboard/colors");
        },

        onError: (error: any) => {
          if (error?.response?.status === 409) {
            setErrorMessage("❌ این رنگ قبلاً در سیستم ثبت شده است.");
          } else {
            setErrorMessage("❌ خطا در ویرایش رنگ. لطفاً دوباره تلاش کنید.");
          }

          console.error(error);
        },
      },
    );
  };

  if (isLoading || !color) {
    return (
      <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
        <Text text="در حال بارگذاری..." size="md" weight="regular" />
      </div>
    );
  }

  return (
    <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
      <Text text="ویرایش رنگ" size="lg" weight="bold" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block font-medium text-sm">نام رنگ</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثلاً: آبی سیر"
            className="h-11 w-full rounded-sm border border-gray px-3 text-sm shadow-sm focus:border-primary focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-sm">کد رنگ (Hex)</label>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded-sm border border-gray"
            />

            <input
              type="text"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              placeholder="#000000"
              className="h-11 flex-1 rounded-sm border border-gray px-3 text-sm shadow-sm focus:border-primary focus:outline-none"
              required
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-sm text-danger">{errorMessage}</div>
        )}
        <div className="flex w-full justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`flex h-11 w-35 items-center justify-center rounded-sm py-2 text-white transition ${
              mutation.isPending
                ? "cursor-not-allowed bg-gray-400"
                : "hover:bg-primary-dark cursor-pointer bg-secondary"
            }`}
          >
            <Text
              text={mutation.isPending ? "در حال ثبت..." : "ویرایش"}
              size="sm"
              weight="medium"
              color="white"
            />
          </button>
        </div>
      </form>

      <div className="mt-4 flex items-center gap-3 rounded-sm border border-gray p-3">
        <span className="font-medium text-sm">پیش‌نمایش:</span>

        <div
          className="h-8 w-8 rounded-sm border"
          style={{ backgroundColor: hexCode }}
        />

        <div className="flex flex-col gap-0.5 text-sm">
          <span>{hexCode.toUpperCase()}</span>
          <span className="text-secondary/70">{hexToRgbString(hexCode)}</span>
          <span className="text-secondary/70">{hexToHslString(hexCode)}</span>
        </div>
      </div>
    </div>
  );
}