import { z } from "zod";

export const createColorSchema = z.object({
  name: z.string().min(1, "نام رنگ الزامی است"),
  hexCode: z.string().min(1, "کد رنگ الزامی است"),
});

export type CreateColorFormValues = z.infer<typeof createColorSchema>;
