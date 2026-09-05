// src/app/dashboard/sizes/[id]/edit/page.tsx
"use client";

import { Text } from "@/src/shared/ui";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSize, useUpdateSize } from "../../../_hooks/useSizes";

export default function EditSizePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data: size, isLoading } = useSize(id);
  const mutation = useUpdateSize();

  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (size) {
      setName(size.name);
      setSortOrder(size.sort_order);
    }
  }, [size]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage("لطفاً نام سایز را وارد کنید.");
      return;
    }

    setErrorMessage("");

    mutation.mutate(
      { id, data: { name: name.trim(), sortOrder } },
      {
        onSuccess: () => {
          alert("✅ سایز با موفقیت ویرایش شد.");
          router.push("/dashboard/sizes");
        },
        onError: (error: any) => {
          alert("❌ خطا در ویرایش سایز. لطفاً دوباره تلاش کنید.");
          console.error("Error updating size:", error);
        },
      },
    );
  };

  if (isLoading || !size) {
    return (
      <div className="flex h-40 items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
      <Text text="ویرایش سایز" size="lg" weight="bold" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block font-medium text-sm">نام سایز</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثلاً: XL"
            className="h-11 w-full rounded-sm border border-gray px-3 text-sm shadow-sm focus:border-primary focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium text-sm">ترتیب نمایش</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="h-11 w-full rounded-sm border border-gray px-3 text-sm shadow-sm focus:border-primary focus:outline-none"
            required
          />
        </div>

        {errorMessage && (
          <div className="text-sm text-danger">{errorMessage}</div>
        )}

        <div className="flex w-full justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`flex h-11 w-35 items-center justify-center rounded-sm text-white transition ${
              mutation.isPending
                ? "cursor-not-allowed bg-gray-400"
                : "hover:bg-primary-dark cursor-pointer bg-secondary"
            }`}
          >
            <Text
              text={mutation.isPending ? "در حال ثبت..." : "ذخیره تغییرات"}
              size="sm"
              weight="medium"
              color="white"
            />
          </button>
        </div>
      </form>
    </div>
  );
}