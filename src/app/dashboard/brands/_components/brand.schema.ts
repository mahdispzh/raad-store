import { z } from "zod";

export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "نام برند الزامی است")
    .min(2, "نام برند باید حداقل 2 کاراکتر باشد"),
});

export type BrandFormValues = z.infer<typeof brandSchema>;
