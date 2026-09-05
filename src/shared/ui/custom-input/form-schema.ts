import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3, "حداقل 3 کاراکتر وارد کنید"),

  email: z.email("ایمیل معتبر نیست"),

  password: z.string().min(6, "حداقل 6 کاراکتر وارد کنید"),

  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  age: z.coerce.number().min(18, "حداقل سن 18 سال است"),
});

export type FormValues = z.infer<typeof formSchema>;
