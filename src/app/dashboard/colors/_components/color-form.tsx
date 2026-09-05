// _components/color-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Text } from "@/src/shared/ui/text/text.ui";
import { StyledButton } from "@/src/shared/ui/styled-button/styled-button.ui";
import { useCreateColor, useUpdateColor } from "../_hooks/useColors";

type Props = {
  mode: "create" | "update";
  initialData?: { id: number; name: string; hex_code: string };
};

export function ColorForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? "");
  const [hex, setHex] = useState(initialData?.hex_code ?? "#000000");

  const createMutation = useCreateColor();
  const updateMutation = useUpdateColor();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async () => {
    if (mode === "create") {
      await createMutation.mutateAsync({ name, hexCode: hex });
    } else if (initialData) {
      await updateMutation.mutateAsync({ id: initialData.id, data: { name, hexCode: hex } });
    }
    router.push("/dashboard/colors");
  };

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-sm bg-accent/50 p-6">
      <Text text={mode === "create" ? "افزودن رنگ" : "ویرایش رنگ"} size="lg" weight="medium" align="right" />

      <div className="flex flex-col gap-1">
        <Text text="نام رنگ" size="sm" color="secondary" align="right" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلا قرمز"
          className="h-10 rounded-xs border border-secondary/40 px-3 text-sm outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Text text="کد رنگ" size="sm" color="secondary" align="right" />
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-10 w-14 cursor-pointer rounded-xs border border-secondary/40"
          />
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#000000"
            className="h-10 flex-1 rounded-xs border border-secondary/40 px-3 text-sm outline-none"
          />
        </div>
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <StyledButton variant="icon" action={() => router.push("/dashboard/colors")}  />
        <StyledButton variant="icon" action={handleSubmit} />
      </div>
    </div>
  );
}